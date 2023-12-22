import "./styles/style.css";

const Upload = () => {
    return (
        <form className="upload-form">
            <label>Title</label>
            <input type="text" name="Title" />
            <label>Description</label>
            <input type="text" name="Description" />
            <label>Year</label>
            <input type="text" name="Year" />
            <label>Price</label>
            <input type="text" name="Price" />
            <label>Files</label>
            <input type="file" name="Files" />
            <button type="submit">Upload</button>
        </form>
    );
}

export default Upload;