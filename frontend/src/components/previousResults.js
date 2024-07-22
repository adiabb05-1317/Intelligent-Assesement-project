import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {
    MDBTable, MDBTableBody, MDBTableHead, MDBCard, MDBCardBody, MDBContainer, MDBRow, MDBCol
} from "mdb-react-ui-kit";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const PreviousResults = () => {
    const [results, setResults] = useState([]);
    const token = localStorage.getItem("token");
    const email = jwtDecode(token).email;

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/questions/admin/getPreviousResults", {
                    params: {
                        email: email
                    }
                });
                setResults(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching previous results:", error);
            }
        };

        fetchResults();
    }, [email]);

    const classifyScore = (score) => {
        if (score >= 80) return "Good";
        if (score >= 50) return "Average";
        return "Bad";
    };

    const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];  // Colors for Good, Average, and Bad respectively

    return (
        <MDBContainer fluid>
            <MDBRow className="mt-5">
                <MDBCol md="12">
                    <MDBCard className="mb-3">
                        <MDBCardBody>
                            <h2 className="card-title mb-4">Your Previous Test Results</h2>
                            <MDBTable striped>
                                <MDBTableHead>
                                    <tr>
                                        <th>#</th>
                                        <th>Subject</th>
                                        <th>Score</th>
                                        <th>Classification</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {results.map((result, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{result.subject}</td>
                                            <td>{result.score}</td>
                                            <td>{classifyScore(result.score)}</td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                <MDBCol md="6">
                    <MDBCard className="mb-3">
                        <MDBCardBody>
                            <h4 className="card-title mb-4">Performance Breakdown</h4>
                            <PieChart width={300} height={300}>
                                <Pie
                                    data={results}
                                    dataKey="score"
                                    nameKey="subject"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                >
                                    {results.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                <MDBCol md="6">
                    <MDBCard className="mb-3">
                        <MDBCardBody>
                            <h4 className="card-title mb-4">Scores Overview</h4>
                            <BarChart
                                width={500}
                                height={300}
                                data={results}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="subject" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="score" fill="#8884d8" />
                            </BarChart>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default PreviousResults;
