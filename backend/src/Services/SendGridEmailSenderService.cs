using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

public class SendGridEmailSenderService : IEmailSender
{
    private readonly SendGridSettings _settings;

    public SendGridEmailSenderService(IOptions<SendGridSettings> settings)
    {
        _settings = settings.Value;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string htmlMessage)
    {
        var client = new SendGridClient(_settings.ApiKey);
        var from = new EmailAddress(_settings.SenderEmail, _settings.SenderName);
        var to = new EmailAddress(toEmail);
        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent: null, htmlContent: htmlMessage);
        var response = await client.SendEmailAsync(msg);

        if ((int)response.StatusCode >= 400)
        {
            // optionally log or throw here
            throw new InvalidOperationException($"Failed to send email: {response.StatusCode}");
        }
    }
}
