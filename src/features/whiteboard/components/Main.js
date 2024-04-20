import React, { useRef, useEffect, useState } from 'react';
import { BsFillPencilFill } from "react-icons/bs";
import { FaEraser } from "react-icons/fa";
import { FaSave } from "react-icons/fa";



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

    const saveCanvasAsImage = () => {
        const canvas = canvasRef.current;
        const imageURI = canvas.toDataURL("image/png"); // Creates a PNG image
        const link = document.createElement('a');
        link.download = 'canvas_image.png';
        link.href = imageURI;
        link.click();
    };

    return (
        <>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
                onMouseMove={draw}
                style={{ width: '100%', height: '85vh', backgroundColor: 'white', margin: 'auto', display: 'block' }}
            />
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px'}}>
                <button className="btn btn-primary p-2 rounded-full border-black border-2" onClick={() => handleToolChange('pencil')}><BsFillPencilFill size={20}/></button>
                <button className="btn btn-primary p-2 rounded-full border-black border-2" onClick={() => handleToolChange('eraser')}><FaEraser size={20}/></button>
                <button className="btn btn-primary p-2 rounded-full border-black border-2" onClick={saveCanvasAsImage}><FaSave size={20}/></button>
            </div>
        </>
    );
};

export default Main;
