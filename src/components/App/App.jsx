import { useState } from 'react';

import css from './App.module.css';

import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";


export default function App() {
    const [values, setValues] = useState(() => {
        const storedValues = JSON.parse(localStorage.getItem("feedbackValues"));
        return storedValues !== null ? storedValues : {
        good: 0,
        neutral: 0,
        bad: 0
    }});

    const updateFeedback = feedbackType => {
        setValues(prevValues => {
            const newValues = {
            ...prevValues,
            [feedbackType]: prevValues[feedbackType] + 1
            };

            localStorage.setItem("feedbackValues", JSON.stringify(newValues));
            return newValues
        });
    };

    const totalFeedback = values.good + values.neutral + values.bad;

    const resetFeedback = () => {
        const initialValues = {
            good: 0,
            neutral: 0,
            bad: 0
        };
        setValues(initialValues);
        localStorage.setItem("feedbackValues", JSON.stringify(initialValues));
    };

    const positiveFeedback = Math.round((values.good / totalFeedback) * 100);

  return (
    <div>
        <Description />
        <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} resetFeedback={resetFeedback} />
        {totalFeedback === 0 ? <Notification /> : <Feedback good={values.good} neutral={values.neutral} bad={values.bad} total={totalFeedback} positive={positiveFeedback} />}
    </div>
  );
}