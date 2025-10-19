"use client";
import React, { useEffect, useState } from "react";
import "./JobsAdmitResultSection.css";
import { fetcher } from "../fetcher";
import Loader from "../Loader/Loader";

const JobsAdmitResultSection = () => {
    const [jobs, setJobs] = useState([]);
    const [admitCards, setAdmitCards] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [jobsRes, admitRes, resultRes] = await Promise.all([
                fetcher(`/naukari?page=1&limit=10&type=jobs`),
                fetcher(`/naukari?page=1&limit=10&type=admit_card`),
                fetcher(`/naukari?page=1&limit=10&type=result`),
            ]);

            setJobs(jobsRes?.data || []);
            setAdmitCards(admitRes?.data || []);
            setResults(resultRes?.data || []);
        } catch (error) {
            console.error("Error fetching naukari data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30vh'}}><Loader size={50} /></div>;

    const Card = ({ title, data, color }) => (
        <div className="card">
            <div className={`card-header ${color}`}>{title}</div>

            <div className="card-body">
                {data.length > 0 ? (
                    data.map((item) => (
                        <a
                            key={item.naukari_id}
                            href={`/${item.seo_section}/${item.slug}`}
                            className="card-link"
                        >
                            {item.title}
                        </a>
                    ))
                ) : (
                    <p className="no-data">No Jobs found.</p>
                )}
            </div>

            {data.length === 10 && <div className="card-footer">
                <a
                    href={`/naukari/${title.toLowerCase().replace(" ", "-")}`}
                    className={`view-btn ${color}`}
                >
                    View All →
                </a>
            </div>}
        </div>
    );

    return (
        <div className="section-container">
            <Card title="Jobs" data={jobs} color="red" />
            <Card title="Admit Card" data={admitCards} color="pink" />
            <Card title="Results" data={results} color="red" />
        </div>
    );
};

export default JobsAdmitResultSection;
