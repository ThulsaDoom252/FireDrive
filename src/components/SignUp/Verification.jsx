import React from 'react';

const Verification = () => {
    return (
        <>
            <div className={'container-sm flex items-center  flex-col h-screen'}>
                <h3 className='
                mt-5
                '>Welcome to FireDrive!</h3>
                <h4 className='
                mt-4
                '>Confirm link has been send to email</h4>
                <p className='
                text-lg
                mt-5
                '>
                    To ensure the security of our platform and protect our users from spam and bot registrations, we
                    require
                    all new users to verify their email address before they can access the full features of our site.

                    To get started, please check your email inbox for a message from FireDrive containing your
                    verification
                    link. If you don't see the email, please check your spam folder or contact our support team for
                    assistance.

                    Once you have received your verification link, simply click on it to complete the
                    verification process. You will then be able to access all of the features and services that
                    FireDrive
                    has to offer.</p>

                <div className={'mt-4 flex flex-col justify-center items-center'}>
                    <button className={'mt-2'}>Resend verification link</button>
                    <button className={'mt-10'}>Return to login page</button>
                </div>

                <p className={'mt-5'}>Thank you for helping us keep FireDrive a safe and secure platform for all of our users. If you have
                    any
                    questions or concerns, please don't hesitate to contact us.</p>

            </div>

        </>

    )
        ;
};

export default Verification;