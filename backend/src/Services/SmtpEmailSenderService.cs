using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using MimeKit;


public class SmtpEmailSenderService : IEmailSender
{
    private readonly SmtpSettings _options;
    public SmtpEmailSenderService(IOptions<SmtpSettings> configuration)
    {
        _options = configuration.Value;
    }

    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        var message = new MimeMessage();

        message.From.Add(new MailboxAddress(_options.SenderName, _options.SenderEmail));
        message.To.Add(MailboxAddress.Parse(email));
        message.Subject = subject;

        var bodyBuilder = new BodyBuilder
        {
            HtmlBody = htmlMessage
        };

        message.Body = bodyBuilder.ToMessageBody();

        using var smtp = new SmtpClient();

        await smtp.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);

        await smtp.AuthenticateAsync(_options.SenderEmail, _options.SenderPassword);
        await smtp.SendAsync(message);
        await smtp.DisconnectAsync(true);
    }
}



