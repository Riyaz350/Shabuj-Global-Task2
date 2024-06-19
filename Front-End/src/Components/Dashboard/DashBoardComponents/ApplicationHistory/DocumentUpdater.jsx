import DocumentDownloader from "./DocumentDownloader";

const DocumentUpdater = ({applicationData}) => {
    return (
        <div>
            <DocumentDownloader applicationData={applicationData}/>
        </div>
    );
};

export default DocumentUpdater;