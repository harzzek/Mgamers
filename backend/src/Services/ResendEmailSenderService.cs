using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using Resend;

public class ResendEmailSenderService : IEmailSender
{
    private readonly ResendSettings _settings;

    public ResendEmailSenderService(IOptions<ResendSettings> settings)
    {
        _settings = settings.Value;
    }

    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        IResend resend = ResendClient.Create(_settings.ApiKey);

        var resp = await resend.EmailSendAsync(new EmailMessage()
        {
            From = _settings.SenderEmail,
            To = email,
            Subject = subject,
            HtmlBody = htmlMessage

        });

        if (!resp.Success)
        {
            // optionally log or throw here
            throw new InvalidOperationException($"Failed to send email: {resp.Exception}");
        }
        
    }
}
