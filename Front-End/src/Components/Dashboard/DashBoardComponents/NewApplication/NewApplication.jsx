import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import DocumentUploader from "./Document/DocumentUploader";
import FirstForm from "./FirstForm/FirstForm";
import Requirements from "./Requirements";
import UniData from "./UniData";
import StudentsDetails from "./SecondForm/StudentsDetails";

const NewApplication = () => {
    const axiosPublic = useAxiosPublic()
    const [serial, setSerial] = useState(2)
    const [uniData, setUniData] = useState([])
    const [documents, setDocuments] = useState([])
    const [firstFormData, setFirstFormData] = useState({})

    

    useEffect(() => {
        axiosPublic.get('/uniData')
            .then(result => setUniData(result.data))
        

    }, [axiosPublic, documents, firstFormData,])

    


    return (
        <div className="mt-5  rounded-lg p-5 md:grid grid-cols-4 gap-2">
            {/* UNI DATA */}
            {serial > 0 &&
                <UniData uni={firstFormData?.uni} season={firstFormData?.season} course={firstFormData?.course} typeOfCourse={firstFormData?.typeOfCourse} country={firstFormData?.country} />
            }
            <div className={`rounded-lg  overflow-auto ${serial == 0 ? 'col-span-4' : 'col-span-3'}`}>
                <div>
                    {serial == 0 &&
                        <FirstForm key={'first'} serial={serial} setSerial={setSerial} uniData={uniData} setFirstFormData={setFirstFormData} />
                    }
                </div>
                <div>
                    {serial == 1 &&
                        <Requirements key={'requirement'} serial={serial} setSerial={setSerial} />
                    }
                </div>

                <div>
                    {serial == 2 &&
                        <DocumentUploader key={'document'} serial={serial} setSerial={setSerial} setDocuments={setDocuments} />
                    }
                </div>
                <div>
                    {serial == 3 &&
                        <div className="flex flex-col bg-white  rounded-lg">
                            <h1 className="p-5 text-lg md:text-xl font-semibold">Please enter student details to process this application            </h1>
                            <div className="m-5 ">
                                <StudentsDetails key={'student'}  documents={documents} firstFormData={firstFormData}/>
                            </div>
                            </div>
                    }
                </div>
            </div>

        </div>
    );
};

export default NewApplication;


