import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

const Form = ({ int, label, state, setState, filterer, dataArray, selected, setSelected, errors, setErrors }) => {

    const [searchText, setSearchText] = useState('')
    const inputStyle = "input input-bordered  text-[#0d3454] w-full   focus:border-2 focus:outline-0 focus:border-purple-400 focus:placeholder:pl-2 transition-all duration-100"

    const Field = () => {
        return (<div className="label">
            <span className="label-text text-red-500">This field is required</span>
        </div>)
    }

    const Label = ({ text, ind }) => {
        return (<div className="label">
            <span className={errors.includes(parseInt(ind)) ? "label-text text-red-500" : selected == parseInt(ind) ? "label-text text-purple-500" : "label-text text-black-500"}>{text}</span>
        </div>)
    }

    return (
        <div className="  w-full relative">
            <Label ind={int} text={label} />
            <div className={`flex items-center  z-0  gap-5 ${`${errors?.includes(int) ? 'border-2 border-red-500 focus:border-red-500' : 'border-gray-400'} ${inputStyle}`}`}>
                <input value={searchText && state ? state : searchText || state} onFocus={() => setSelected(int)} className="w-full"
                    onChange={(e) => {
                        setState(e.target.value)
                        setSearchText(e.target.value)
                        setErrors((prevItems) => prevItems.filter(item => item !== int))
                    }} type="text" />
                <p onClick={() => setSelected(int)} className="z-0  cursor-pointer justify-end flex"><FaAngleDown /></p>
            </div>
            {errors.includes(int) ? <Field /> : <></>}
            <div className={`absolute w-full bg-white shadow-lg p-2 flex flex-col text-start z-10  ${selected == int ? 'flex' : 'hidden'}`}>
                {filterer ?
                    <div>
                        {selected === int &&
                            filterer.filter(country => country.toLowerCase().includes(searchText.toLowerCase())) // Filter countries based on searchText
                                .map(country => (
                                    <option
                                        onClick={() => {
                                            setState(country);
                                            setSelected(0);
                                            setErrors(prevItems => prevItems.filter(item => item !== int));
                                        }}
                                        className="hover:bg-gray-300 rounded-lg p-1 px-2 cursor-pointer"
                                        key={country}
                                    >
                                        {country}
                                    </option>
                                ))
                        }
                    </div> :
                    <div>
                        {selected === int &&
                            dataArray.map((country) =>
                                <option onClick={() => {
                                    setState(country)
                                    setSelected(0)
                                    setErrors((prevItems) => prevItems.filter(item => item !== int))
                                }} className="hover:bg-gray-300 rounded-lg p-1 px-2 cursor-pointer" key={country}  > {country} </option>
                            )
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Form;