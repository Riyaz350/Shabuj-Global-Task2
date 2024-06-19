import PdfViewer from "../NewApplication/Document/PdfViewer";
import DocumentDownloader from "./DocumentDownloader";

const DocumentUpdater = ({base64String}) => {
    return (
        <div>
            <PdfViewer base64String={base64String}/>
            <DocumentDownloader/>
        </div>
    );
};

export default DocumentUpdater;