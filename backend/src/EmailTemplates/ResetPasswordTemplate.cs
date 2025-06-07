public static class ResetPasswordTemplate
{
    public static string Render(string resetLink, string username)
    {
        return $@"
            <html>
                <body>
                    <p>Hello,</p>
                    <p>We received a request to reset the password for your account ({username}).</p>
                    <p>
                        Click the button below to reset your password:
                    </p>
                    <p>
                        <a href='{resetLink}' style='
                            background-color: #007bff;
                            color: white;
                            padding: 10px 20px;
                            text-decoration: none;
                            border-radius: 4px;
                        '>Reset Password</a>
                    </p>
                    <p>If you didn't request this, just ignore this email.</p>
                    <p>Thanks,<br/>Mgamers Developer Group</p>
                </body>
            </html>
        ";
    }
}