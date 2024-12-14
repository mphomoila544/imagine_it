import React, { useRef, useEffect, useState } from "react";
import Header from "../Components/Header";
import "./styles/design.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight, faRotateLeft, faPaintBrush, faFloppyDisk, faEraser } from '@fortawesome/free-solid-svg-icons'


function Design() {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [object_x_coords, set_x_object_coords] = useState([]);
    const [object_y_coords, set_y_objects_coords] = useState([]);
    let x_points = [];
    let y_points = [];
    let new_x = [];
    let new_y = [];
    let corners = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctxRef.current = ctx;

        const coord = { x: 0, y: 0 };
        let paint = false;

        function resize() {
            const container = canvas.parentElement;
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        }

        function getPosition(event) {
            const rect = canvas.getBoundingClientRect(); 
            coord.x = event.clientX - rect.left;
            coord.y = event.clientY - rect.top;
        }

        function startPainting(event) {
            paint = true;
            getPosition(event);
        }

        function stopPainting() {
            paint = false;
            ctx.beginPath(); 
        }

        function sketch(event) {
            if (!paint) return;
            const ctx = ctxRef.current;

            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.strokeStyle = "black";

            ctx.lineTo(coord.x, coord.y);
            ctx.stroke();
            ctx.beginPath(); 
            x_points.push(coord.x);
            y_points.push(coord.y);
            ctx.moveTo(coord.x, coord.y);
            console.log(coord.x, coord.y);
            getPosition(event);
        }
        resize();
        window.addEventListener("resize", resize);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mousemove", sketch);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousedown", startPainting);
            canvas.removeEventListener("mouseup", stopPainting);
            canvas.removeEventListener("mousemove", sketch);
        };
    }, []);

    function clear() {
        const ctx = ctxRef.current;
        const canvas = canvasRef.current;
        if(ctx && canvas){
            //console.log(ctx);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (x_points && y_points){
                console.log(x_points);
                console.log(y_points);
            }else if(y_points){
                console.log(y_points);
            }else if(x_points){
                console.log(x_points);
            }
            
            
        }
    }

    async function sleep(ms) {
        await new Promise((resolve) => setTimeout(resolve, ms));
      }

    async function re_draw(){
        const ctx = ctxRef.current;
        const canvas = canvasRef.current;
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
        
        if (x_points && y_points){
            for(let i = 0; i < x_points.length; i++){
                ctx.lineTo(x_points[i], y_points[i]);
                ctx.stroke();
                await sleep(10);
                
            }
            x_points = []
            y_points = []
        }
    }

    function straighten(){
        let starting_point = 0;
        let endpoints = [];
        let names = [];
        let change_y = 0;
        let change_x = 0;
        let prev_x = 0;
        let prev_y = 0;
        let prev= "";
        let curr = "";
        let changes = [];
        let k = 0;
        let points_len = x_points.length;
        console.log("points len is "+points_len);
        for(let i = 0; i < x_points.length; i++){
            change_x = 0;
            change_y = 0;
            for(let j = i; j < i+5; j++){
                change_x += Math.abs(x_points[j]);
                change_y += Math.abs(y_points[j]);
            }

            if(Math.abs(prev_x-change_x)< Math.abs(prev_y-change_y)){
                changes.push("y");
                curr = "y";
            }else if(Math.abs(prev_x-change_x)> Math.abs(prev_y-change_y)){
                changes.push("x");
                curr = "x";

            }
            console.log(curr);
            if(prev===""){
                console.log(prev, curr);
            }else if(prev !==curr){
                endpoints.push(i);
                names.push(prev);

            }
            prev = curr;
            prev_x = change_x
            prev_y = change_y

            
        }
        endpoints.push(points_len);
        corners = endpoints;
        console.log(endpoints);
        names.push("x");
        console.log(names);
        for(let x = 0; x < endpoints.length; x++){
            if(names[x] === "x" && x ===0){
                console.log("changing for x");
                for(let i = 0; i <= endpoints[x]; i++){
                    x_points[i]=x_points[2]
                }
            }else if(names[x] === "x"){
                console.log("changing for x");
                for(let i = endpoints[x-1]+2; i<=endpoints[x+1]; i++){
                    x_points[i]=x_points[endpoints[x]];
                }
            }else if(names[x] === "y"){
                console.log("changing for y");
                for(let i = endpoints[x-1]+2; i<=endpoints[x+1]; i++){
                    y_points[i]=y_points[endpoints[x]];
                }             
            }
        }
        console.log(x_points);
        new_x = x_points;
        new_y = y_points;
        console.log(y_points);
        clear();
        re_draw();
    }
       
    function make_3d(){
        const ctx = ctxRef.current;
        const canvas = canvasRef.current;
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
        console.log("make 3D clicked");
        console.log("these are the x points: "+new_x);
        console.log("These are the y points: " + new_y);
        console.log("corners: "+ corners);
        let end_points_x = [];
        let end_points_y = [];
        let colors = ["red","green", "blue", "orange"];
        for(let i = 0; i < corners.length; i++){
            console.log(new_x[corners[i]], corners[i]);
            let corner_point_x = new_x[corners[i]];
            let corner_point_y = new_y[corners[i]];
            console.log("The straightend corner coordinates: "+corner_point_x+" "+corner_point_y);

            ctx.moveTo(corner_point_x, corner_point_y);
            ctx.lineTo(corner_point_x+100, corner_point_y+20);
            ctx.stroke();
            
            end_points_x.push(corner_point_x+100);
            end_points_y.push(corner_point_y+20);
            
        }
        //draw vertical
        ctx.moveTo(new_x[corners[1]], new_y[corners[0]]);
        ctx.lineTo(new_x[corners[1]]+100, end_points_y[0]+20);
        ctx.stroke();

        ctx.moveTo(end_points_x[0], end_points_y[0]);
        ctx.lineTo(end_points_x[2], end_points_y[2]);
        ctx.stroke();
        ctx.moveTo(end_points_x[2], end_points_y[2]);
        ctx.lineTo(end_points_x[1], end_points_y[1]);
        ctx.stroke();

        ctx.moveTo(new_x[corners[1]]+100, end_points_y[0]+20);
        ctx.lineTo(end_points_x[1], end_points_y[1]);
        ctx.stroke();

        ctx.moveTo(new_x[corners[1]]+100, end_points_y[0]+20);
        ctx.lineTo(end_points_x[0], end_points_y[0]);
        ctx.stroke();

        ctx.rotate(100 * Math.PI / 180);


    }
    function mouse_interact(){
        console.log("mouse rotation is clicked");
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        ctx.rotate(90 * Math.PI / 180);

    }
    function elisticity(){
        console.log("Making the diagrams elastic");
    }
    

    
    return (
        <div className="main-design-container">
            <Header />
            <div className="design-container">
            <div className = "side-bar">
                    <ul className = "side-bar-list">
                        <li onClick = {clear}>
                            <FontAwesomeIcon className="edit-icons" icon={faRotateRight} />
                        </li>
                        <li>
                            <FontAwesomeIcon className="edit-icons" icon = {faPaintBrush} />
                        </li>
                        <li>
                            <FontAwesomeIcon className="edit-icons" icon = {faFloppyDisk} />
                        </li>
                        <li>
                            <FontAwesomeIcon className="edit-icons" icon = {faEraser} />
                        </li>
                        <li onClick = {re_draw}>
                            <FontAwesomeIcon className = "edit-icons" icon = {faRotateLeft} />
                        </li>
                        
                    </ul>
               </div>
                <div className="d-mid-container">

                    <div className="drawer-container">
                        <div className="canva-container">
                            <canvas id="design" ref={canvasRef}></canvas>
                        </div>
                        <div className="d-options">
                            <ul className="d-opt-list">
                                <li><button onClick={make_3d}>make 3D</button></li>
                                <li><button onClick = {straighten}>straighten</button></li>
                                <li><button onClick = {mouse_interact}>mouse interact</button></li>
                                <li><button>cam interact</button></li>
                            </ul>
                            <div className="d-form">
                                <form className="ask-form">
                                    <input className="ask-inp" placeholder="Ask AI to draw for you" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Design;
