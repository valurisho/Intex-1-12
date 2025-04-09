// This is a temporary placeholder so role-based authentication works without actual email functionality.
// You can replace this with a real email service (e.g., SendGrid) later if needed.

using Microsoft.AspNetCore.Identity;

namespace INTEX.API.Data;

public class NoOpEmailSender<TUser> : IEmailSender<TUser> where TUser : class
{
    public Task SendConfirmationLinkAsync(TUser user, string email, string confirmationLink) =>
        Task.CompletedTask;

    public Task SendPasswordResetLinkAsync(TUser user, string email, string resetLink) =>
        Task.CompletedTask;

    public Task SendPasswordResetCodeAsync(TUser user, string email, string resetCode) =>
        Task.CompletedTask;

    public Task SendEmailAsync(TUser user, string email, string subject, string htmlMessage) =>
        Task.CompletedTask;
}
