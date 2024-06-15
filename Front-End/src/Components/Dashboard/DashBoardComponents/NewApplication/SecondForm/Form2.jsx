
const Form2 = ({int, label, state, setState, placeholder, selected, setSelected, errors, setErrors}) => {

    const inputStyle = "input input-bordered  text-[#0d3454] w-full   focus:border-2 focus:outline-0 focus:border-purple-400 focus:placeholder:pl-2 transition-all duration-100"


    const Field =  ()=>{
        return(<div className="label">
        <span className="label-text text-red-500">This field is required</span>
    </div>)
    }

    const Label =({text,ind})=>{
        return(<div className="label">
        <span className={errors.includes(parseInt(ind)) ? "label-text text-red-500" :  selected == parseInt(ind) ? "label-text text-purple-500": "label-text text-black-500"}>{text}</span>
    </div>)
    }
    const addError = (e)=>{
        setErrors(prevErrors => [...prevErrors, e]);
    }
    return (
        <div  className="form-control w-full">
                <Label ind={int} text={label}  />
                <input onFocus={()=>setSelected(int)} onBlur={()=>{ setSelected(0)
                !state.trim() && addError(int)}} onChange={e=>{setSelected(int)
                    setErrors((prevItems) => prevItems.filter(item => item !== int)) 
                setState(e.target.value)}} type="text"  placeholder={placeholder} className={`${errors?.includes(int) ? 'border-2 border-red-500 focus:border-red-500':'border-gray-400' } ${inputStyle}`}  />
                {errors.includes(int) ? <Field/> : <></>}
            </div>
    );
};

export default Form2;