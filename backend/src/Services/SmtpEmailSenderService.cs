using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using System.Net.Mail;


public class SmtpEmailSenderService : IEmailSender
{
    private readonly SmtpSettings _options;
    public SmtpEmailSenderService(IOptions<SmtpSettings> configuration)
    {
        _options = configuration.Value;
    }
    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        var mail = new MailMessage()
        {
            From = new MailAddress(_options.SenderEmail, _options.SenderName),
            Subject = subject,
            Body = htmlMessage,
            IsBodyHtml = true,
        };
        mail.To.Add(email);

        using var smtp = new SmtpClient(_options.Server, _options.Port)
        {
            EnableSsl = false // MailHog does not require SSL
        };

        await smtp.SendMailAsync(mail);
    }
}



