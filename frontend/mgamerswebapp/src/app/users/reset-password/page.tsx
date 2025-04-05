"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { changePassword } from "@/stores/accountStore";
import { changePasswordDTO } from "../interfaces/changePassword";
import { Form } from "@heroui/form";
import { Button, Input } from "@heroui/react";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (token && email && newPassword) {

            const data: changePasswordDTO = { email: email, token: token, password: newPassword };

            if (newPassword === newPasswordConfirm) {
                try {
                    const passwordChangeResponse = await changePassword(data);
                    setMessage("Your password has been changed")
                } catch (error) {
                    setErrorMessage("Something went wrong. Either password too short, or sevice is down")
                }
            } else {
                setErrorMessage("Passwords are not alike")
            }

        }


    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="p-6 bg-secondary-300 rounded shadow-md w-96">
                <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
                {message && <p className="text-success-300">{message}</p>}
                {errorMessage && <p className="text-warning-300">{errorMessage}</p>}

                <Form onSubmit={handleResetPassword}>
                    <Input
                        isRequired
                        type="password"
                        label="Password"
                        labelPlacement="outside"
                        placeholder="New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <Input
                        isRequired
                        type="password"
                        label="Password"
                        labelPlacement="outside"
                        placeholder="Confirm password"
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    />

                    <Button type="submit" color="primary">
                        Reset Password
                    </Button>
                </Form>

            </div>
        </div>
    );
}
