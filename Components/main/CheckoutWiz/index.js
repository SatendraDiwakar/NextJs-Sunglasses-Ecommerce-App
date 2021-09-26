import React from 'react'
// material ui
import { Stepper, Step, StepLabel, Box } from '@material-ui/core'
// style
import CheckoutWizStyle from './CheckoutWiz.module.css'

export default function CheckoutWiz({ activeStep = 0 }) {
    const steps = ['Login', 'Shipping Address', 'Payment Method', 'Place Order']
    return (
        <div className={CheckoutWizStyle.container}>
                <Stepper className={CheckoutWizStyle.trans} activeStep={1} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            {/* <div className={CheckoutWizStyle.line}>
            </div>
            <div className={CheckoutWizStyle.stepsContainer}>
                <div className={CheckoutWizStyle.step}>
                    <div className={CheckoutWizStyle.stepIcon}>

                    </div>
                    <p className={CheckoutWizStyle.stepName}>Login</p>
                </div>
                <div className={CheckoutWizStyle.step}>
                    <div className={CheckoutWizStyle.stepIcon}>

                    </div>
                    <p className={CheckoutWizStyle.stepName}>Shipping Address</p>
                </div>
                <div className={CheckoutWizStyle.step}>
                    <div className={CheckoutWizStyle.stepIcon}>

                    </div>
                    <p className={CheckoutWizStyle.stepName}>Payment</p>
                </div>
                <div className={CheckoutWizStyle.step}>
                    <div className={CheckoutWizStyle.stepIcon}>

                    </div>
                    <p className={CheckoutWizStyle.stepName}>Login</p>
                </div>
            </div> */}
        </div>
    )
}
