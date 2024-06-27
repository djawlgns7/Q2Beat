import React, { useState } from 'react';

const CompareStrings = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [similarity, setSimilarity] = useState(null);

    const handleCompare = async () => {
        const response = await fetch('http://bit-two.com:8080/api/text/compare', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: question, answer: answer }),
        });

        const data = await response.json();
        if (data.similarity !== undefined) {
            setSimilarity(data.similarity);
        } else {
            setSimilarity("Error calculating similarity");
        }
    };

    return (
        <div>
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Question string" />
            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Answer string" />
            <button onClick={handleCompare}>Compare</button>
            {similarity !== null && <p>Similarity: {similarity}%</p>}
        </div>
    );
};

export default CompareStrings;