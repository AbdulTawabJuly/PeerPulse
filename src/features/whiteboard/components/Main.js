import React, { useRef, useEffect, useState } from 'react';
import { BsFillPencilFill } from "react-icons/bs";
import { FaEraser } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { useSocket } from '../../../context/socket';
import { useParams } from 'react-router-dom';
import Viewer from './Viewer';
import { selectMembers } from '../whiteboardSlice';
import {useSelector} from 'react-redux';

const Main = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000'); // Default to black for pencil
    const [lineWidth, setLineWidth] = useState(5); // Default line width
    const [cursor, setCursor] = useState('crosshair'); // Default cursor for pencil

    const roomID = useParams();
    const { getSocket } = useSocket();
    const socketRef = useRef(null);

    const members = useSelector(selectMembers);

    useEffect(() => {
        console.log("members: ",members)
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas background as white initially

        socketRef.current = getSocket();
        socketRef.current?.on("drawing", (data) => {
            if (!isDrawing) {
                drawFromSocket(data);
            }
        });
        socketRef.current?.on("startDrawing", (data) => {
            const { offsetX, offsetY, lineWidth, color } = data;
            const context = canvasRef.current.getContext('2d');
            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            context.beginPath();
            context.moveTo(offsetX, offsetY);
            setIsDrawing(true);
        });

        socketRef.current?.on("stopDrawing", () => {
            const context = canvasRef.current.getContext('2d');
            context.closePath();
            setIsDrawing(false);
        });

    }, []);

    const drawFromSocket = ({ offsetX, offsetY, color, lineWidth }) => {
        const context = canvasRef.current.getContext('2d');
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.lineTo(offsetX, offsetY);
        context.stroke();
    };

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        const context = canvasRef.current.getContext('2d');
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        setIsDrawing(true);
        socketRef.current?.emit("startDrawing", { offsetX, offsetY, color, lineWidth }, roomID);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        const context = canvasRef.current.getContext('2d')

        context.lineTo(offsetX, offsetY);
        context.stroke();

        socketRef.current?.emit("drawing", { offsetX, offsetY, color, lineWidth }, roomID);
    };

    const stopDrawing = () => {
        const context = canvasRef.current.getContext('2d');
        context.closePath();
        setIsDrawing(false);
        socketRef.current?.emit("stopDrawing", roomID);
    };

    const handleToolChange = (tool) => {
        if (tool === 'pencil') {
            setColor('#000000'); // Set color to black for pencil
            setLineWidth(5); // Can adjust according to desired thickness
            setCursor('crosshair'); // Set cursor style for pencil
        } else if (tool === 'eraser') {
            setColor('white'); // Set color to white for eraser
            setLineWidth(10); // Typically a bigger line width for eraser
            setCursor('cell'); // Set cursor style for eraser
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

    const leave = () => {
        window.location.href =`/room/${roomID.roomID}`;
    }

    return (
        <>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
                onMouseMove={draw}
                style={{ width: '100%', height: '85vh', backgroundColor: 'white', margin: 'auto', display: 'block', cursor: cursor }}
            />
            <div className='grid grid-cols-3 flex items-center' style={{height:'8vh'}}>
                <div>
                    <div className='flex gap-2' style={{marginLeft:'10%'}}>
                        <Viewer />
                        <Viewer />
                        <Viewer />
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button className="btn btn-primary p-2 rounded-full border-black border-2" onClick={() => handleToolChange('pencil')}><BsFillPencilFill size={20} /></button>
                    <button className="btn btn-primary p-2 rounded-full border-black border-2" onClick={() => handleToolChange('eraser')}><FaEraser size={20} /></button>
                    <button className="btn btn-primary p-2 rounded-full border-black border-2" onClick={saveCanvasAsImage}><FaSave size={20} /></button>
                </div>
                <div className='flex justify-end items-center' style={{marginRight:'10%'}}>
                    <button className='border-2 border-black rounded-lg px-6 py-2' onClick={leave}>Leave</button>
                </div>
            </div>

        </>
    );
};

export default Main;