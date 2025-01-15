import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, "Enter Employee Name"],
        trim : true
    },
    email: {
        type : String,
        required : [true, "Enter Email"],
        unique : true,
        trim : true
    },
    mobile: {
        type: Number,
        required: [true, "Enter Mobile Number"],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v.toString());
            },
            message: props => `${props.value} is not a valid 10-digit mobile number!`
        }
    },
    employee_id: {
        type: Number,
        required: [true, "Enter your Employee ID"],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{4}$/.test(v.toString());
            },
            message: props => `${props.value} is not a valid 4-digit employee id!`
        }
    }
       
})

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;