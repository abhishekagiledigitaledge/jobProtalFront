"use client"

import React, { useEffect, useState } from 'react'
import './results.scss'
import { getFetchExamDetails } from '@/src/lib/getFetchExamDetail';

const latestJobs = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExamDetails = async () => {
            const type = 'result';
            try {
                const cardList = await getFetchExamDetails(type);
                setData(cardList);
            } catch (err) {
                console.log(err, 'err');
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchExamDetails();
    }, []);


    return (
        <div className="admin-card-container">
            <h1 className="heading">Result</h1>
            <p className='text'>Welcome to <strong>Sarkari Result.</strong> Stay informed about the
                Result of various competitive exams conducted by government bodies across India, whether
                you are waiting for the Result of any recruitment exam, entrance exam or any other
                government exam then we update the Result from time to time to keep
                you informed. <a href="">Let’s update.</a></p>
            <p className="text"><strong>Sarkari Result</strong> में आपका स्वागत है। भारत भर में सरकारी निकायों द्वारा आयोजित विभिन्न प्रतियोगी परीक्षाओं के परिणाम के बारे में सूचित रहें, चाहे आप किसी भी भर्ती परीक्षा, प्रवेश परीक्षा या किसी अन्य सरकारी परीक्षा के परिणाम का इंतजार कर रहे हों तो हम आपको सूचित रखने के लिए समय-समय पर परिणाम अपडेट करते हैं।</p>
            <h2>All Latest <span className="highlight">Examination Result</span></h2>
            <ul className="list">
                {data?.map((item, index) => (
                    <li key={index}><a href={item?.url}>{item?.name_of_post}</a></li>
                ))}
            </ul>
        </div>

    )
}

export default latestJobs;