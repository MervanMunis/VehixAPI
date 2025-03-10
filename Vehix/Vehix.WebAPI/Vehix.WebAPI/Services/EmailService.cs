using System.Security.Cryptography;
using MailKit.Net.Smtp;
using StackExchange.Redis;
using Vehix.WebAPI.Core;
using Vehix.WebAPI.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using MimeKit.Text;

namespace Vehix.WebAPI.Services
{
    public class EmailService(IConfiguration configuration, IConnectionMultiplexer redis) : IEmailService
    {
        private readonly IDatabase _db = redis.GetDatabase();

        public async Task<ServiceResult<bool>> SendEmailAsync(string toEmail)
        {
            var verificationKey = GenerateVerificationKey();

            var frontendName = configuration["FrontendName"];
            var user = configuration["Email:User"];
            var domain = configuration["Email:Domain"];
            var password = configuration["Email:Password"];

            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("Vehix", user));
            emailMessage.To.Add(MailboxAddress.Parse(toEmail));
            emailMessage.Subject = "VEHIX: Requested API Key Verification.";

            emailMessage.Body = new TextPart("html")
            {
                Text = $@"
                <html>
                <body style='font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;'>
                    <table width='100%' cellpadding='0' cellspacing='0' style='max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; padding: 20px;'>
                        <tr>
                            <td style='text-align: center;'>
                                <h2 style='color: #333333;'>VEHIX</h2>
                                <p style='font-size: 18px; color: #333333; margin: 20px 0;'>API Key Verification</p>
                                <p style='font-size: 16px; color: #555555;'>We have received your request.</p>
                                <p style='font-size: 16px; color: #555555;'>This verification link will expire in <strong style='color: #ff4444;'>15 minutes</strong>.</p>
                                <p style='font-size: 16px; color: #555555;'>Use the link below to retrieve your API key:</p>
                                <a href='{frontendName}/verify?token={verificationKey}' 
                                    style='display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;'>
                                    Verify API Key
                                </a>
                                <p style='font-size: 14px; color: #999999; margin-top: 20px;'>If you didn’t request this email, you can safely ignore it.</p>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>"
            };

            var redisKey = $"ApiKeyVerificationKey:{verificationKey}";

            using var client = new SmtpClient();

            try
            {
                var expiry = TimeSpan.FromMinutes(15);
                await _db.StringSetAsync(redisKey, toEmail, expiry);

                await client.ConnectAsync(domain, 587, MailKit.Security.SecureSocketOptions.StartTls); // YunoHost SMTP sunucusu bilgileri

		        await client.AuthenticateAsync(user, password); // SMTP kullanıcı adı ve şifresi

                await client.SendAsync(emailMessage);

                return ServiceResult<bool>.SuccessResult(true);
            }
            catch (Exception ex)
            {
                await _db.KeyDeleteAsync(redisKey);
                return ServiceResult<bool>.FailureResult($"An error occured while sending email: {ex.Message}");
            }
            finally
            {
                if (client.IsConnected)
                {
                    await client.DisconnectAsync(true);
                }
            }
        }

        private static string GenerateVerificationKey()
        {
            var apiKeyBytes = new byte[64];
            RandomNumberGenerator.Fill(apiKeyBytes);
            return Base64UrlEncoder.Encode(apiKeyBytes);
        }

        public async Task<ServiceResult<bool>> SendContactMailAsync(string to, string subject, string message)
        {
            var user = configuration["Email:User"];
            var domain = configuration["Email:Domain"];
            var password = configuration["Email:Password"];

            using var smtp = new SmtpClient();

            try
            {
                var email = new MimeMessage();
                email.From.Add(new MailboxAddress("Vehix-Contact", user));
                email.To.Add(MailboxAddress.Parse(to));
                email.Subject = subject;
                email.Body = new TextPart(TextFormat.Html) { Text = message };

                await smtp.ConnectAsync(domain, 587, MailKit.Security.SecureSocketOptions.StartTls);

                await smtp.AuthenticateAsync(user, password);

                await smtp.SendAsync(email);

                return ServiceResult<bool>.SuccessResult(true);
            }
            catch (Exception ex)
            {
                return ServiceResult<bool>.FailureResult($"An error occured while sending email: {ex.Message}");
            }
            finally
            {
                if (smtp.IsConnected)
                {
                    await smtp.DisconnectAsync(true);
                }
            }
        }
    }
}
