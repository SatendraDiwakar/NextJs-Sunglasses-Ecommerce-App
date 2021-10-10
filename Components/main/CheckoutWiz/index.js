import dynamic from 'next/dynamic'
import React from 'react'
// material ui
import { Stepper, Step, StepLabel, StepConnector } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
// style
import CheckoutWizStyle from './CheckoutWiz.module.css'

function CheckoutWiz({ activeStep = 0 }) {

    const steps = ['Login', 'Shipping Address', 'Payment Method', 'Place Order']

    // checkout wizard styles
    const useStyle = makeStyles({
        stepperBackground: {
            background: 'transparent'
        },
        stepIconTextFontSize: {
            fontSize: '1.2rem',
        },
        stepIconRoot: {
            fontSize: 25,
            "&.MuiStepIcon-active": {
                color: "#0087ff"
            },
            "&.MuiStepIcon-completed": {
                color: "#da5252"
            }
        },
        stepLabelStyles: {
            fontSize: '1.5rem',
            "&.MuiStepLabel-completed": {
                fontWeight: 600,
                color: "#da5252"
            },
            "&.MuiStepLabel-active": {
                fontWeight: 600,
                color: "#0087ff"
            },
        },
        stepConnectorStyle: {
            "&.MuiStepConnector-active": {
                background: '#0087ff'
            },
            "&.MuiStepConnector-completed": {
                background: '#ff1010'
            },
        }
    });
    const checkoutWizMuiStyle = useStyle();

    return (<>
        <div className={CheckoutWizStyle.container}>
            <Stepper
                activeStep={activeStep}
                classes={{ root: checkoutWizMuiStyle.stepperBackground }}
                connector={<StepConnector classes={{ root: checkoutWizMuiStyle.stepConnectorStyle }} />}
                alternativeLabel
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel classes={{ label: checkoutWizMuiStyle.stepLabelStyles }}
                            StepIconProps={{
                                classes: {
                                    root: checkoutWizMuiStyle.stepIconRoot,
                                    text: checkoutWizMuiStyle.stepIconTextFontSize,
                                }
                            }}>
                            {label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    </>)
}
export default dynamic(() => Promise.resolve(CheckoutWiz), { ssr: false });