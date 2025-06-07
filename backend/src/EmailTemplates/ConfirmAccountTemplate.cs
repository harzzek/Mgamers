public static class ConfirmAccountTemplate
{
    public static string Render(string resetLink, string username)
    {
        return $@"
            <html>
                <body>
                    <p>Hello,</p>
                    <p>Welcome to Mgamers! Please confirm you account ({username}).</p>
                    <p>
                        Click the button below to confirm your account:
                    </p>
                    <p>
                        <a href='{resetLink}' style='
                            background-color: #007bff;
                            color: white;
                            padding: 10px 20px;
                            text-decoration: none;
                            border-radius: 4px;
                        '>Confirm Account</a>
                    </p>
                    <p>If you didn't create and account, just ignore this email.</p>
                    <p>Thanks,<br/>Mgamers Developer Group</p>
                </body>
            </html>
        ";
    }
}