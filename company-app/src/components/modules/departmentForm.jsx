import { useState, useEffect } from 'react';
import InputField from '../widgets/inputField';
import Button from '../elements/button';
import { useNavigate } from 'react-router-dom';
import SelectField from '../widgets/selectField';

const DepartmentForm = ({ addDepartment, updateDepartment, editingDepartment,employees, errors, refresh, setRefresh }) => {
    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] =useState(false);
    const [formData, setFormData] = useState({
        deptName: '',
        mgrEmpNo: ''
    });

    useEffect(() => {
        if (editingDepartment) {
            setFormData({
                deptName: editingDepartment.deptName,
                mgrEmpNo: editingDepartment.mgrEmpNo,
            });
        } else {
            setFormData({
                deptName: '',
                mgrEmpNo: ''
            });
        }
    }, [editingDepartment]);

    const handleInputChange = (e) => {
        const { id, name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [type === "radio" ? name : id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingDepartment) {
                const result = await updateDepartment(formData);
                if (!errors && Object.keys(result).length === 0) {
                    setFormData({ deptName: '', mgrEmpNo: '' });
                    setRefresh(!refresh);
                    setShouldNavigate(true);
                }
            } else {
                const result = await addDepartment(formData);
                if (!errors && Object.keys(result).length === 0) {
                    setFormData({ deptName: '', mgrEmpNo: '' });
                    setRefresh(!refresh);
                    setShouldNavigate(true);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        if (shouldNavigate) {
            navigate('/departments');
            setShouldNavigate(false); // Reset state setelah navigasi
        }
    }, [shouldNavigate, navigate]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Department Name"
                    type="text"
                    id="deptName"
                    value={formData.deptName}
                    onChange={handleInputChange}
                />
                {errors?.deptName ? <h6 className='text-start'>{errors.deptName}</h6> : ''}
                <SelectField
                    label="Select Manager"
                    id="mgrEmpNo"
                    options={employees}
                    value={formData.mgrEmpNo}
                    labelKey={ ["fname", "lname"]}
                    valueKey={'empNo'}
                    optionTitle={'Choose Manager'}
                    onChange={(e) => handleInputChange(e,'mgrEmpNo')}
                    className="form-select"
                />
                {errors?.mgrEmpNo ? <h6 className='text-start'>{errors.mgrEmpNo}</h6> : ''}

                <Button type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default DepartmentForm;
