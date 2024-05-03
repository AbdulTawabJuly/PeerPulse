function Viewer(props) {
    return (
        <div className="p-3 rounded-full border-black border-2">
             <p>{props.member.initials}</p>
        </div>
    );
}

export default Viewer