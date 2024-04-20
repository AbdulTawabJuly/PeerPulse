import React, { useRef, useEffect, useState } from 'react';

const Main = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000'); // Default to black for pencil
    const [lineWidth, setLineWidth] = useState(5); // Default line width

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas background as white initially
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        const context = canvasRef.current.getContext('2d');
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        const context = canvasRef.current.getContext('2d');
        context.lineTo(offsetX, offsetY);
        context.stroke();
    };

    const stopDrawing = () => {
        const context = canvasRef.current.getContext('2d');
        context.closePath();
        setIsDrawing(false);
    };

    const handleToolChange = (tool) => {
        if (tool === 'pencil') {
            setColor('#000000'); // Set color to black for pencil
            setLineWidth(5); // Can adjust according to desired thickness
        } else if (tool === 'eraser') {
            setColor('white'); // Set color to white for eraser
            setLineWidth(10); // Typically a bigger line width for eraser
        }
    };

    return (
        <>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
                onMouseMove={draw}
                style={{ width: '85%', height: '85%', backgroundColor: 'white', margin: 'auto', marginTop: '2%' }}
            />
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px'}}>
                <button className="btn btn-primary" onClick={() => handleToolChange('pencil')}>Pencil</button>
                <button className="btn btn-primary" onClick={() => handleToolChange('eraser')}>Eraser</button>
                <button className="btn btn-primary" onClick={() => alert('Save functionality not implemented yet')}>Save</button>
            </div>
        </>
    );
};

export default Main;
