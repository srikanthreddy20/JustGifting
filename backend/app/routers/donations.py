"""Donation endpoint with simulated thank-you email."""
import logging
from fastapi import APIRouter
from app.schemas import DonationRequest
from app.config import settings

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/donate", tags=["donations"])


@router.post("")
def donate(body: DonationRequest):
    """
    Record a donation and send a simulated thank-you email.

    Real email integration: replace the logger call below with an SMTP
    (smtplib / aiosmtplib) or transactional-email call, e.g.
        import sendgrid
        sg = sendgrid.SendGridAPIClient(api_key=settings.sendgrid_api_key)
        sg.client.mail.send.post(request_body=build_email(body))
    or use AWS SES / Mailgun / Resend in a similar fashion.
    The `settings.smtp_from` value should be used as the sender address.
    """

    # Simulate recording the donation (would INSERT into a donations table).
    logger.info(
        "Donation recorded: donor=%s gift_id=%s amount=%s",
        body.donor_email,
        body.gift_id,
        body.amount,
    )

    # Simulate sending a thank-you email.
    logger.info(
        "Thank-you email sent from %s to %s for gift %s",
        settings.smtp_from,
        body.donor_email,
        body.gift_id,
    )

    return {
        "status": "ok",
        "email_sent": True,
        "message": f"Thank you email sent to {body.donor_email}",
    }
