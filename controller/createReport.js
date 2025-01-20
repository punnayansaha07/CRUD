
import axios from "axios";
import fs from "fs";
import PDFDocument from "pdfkit";
export const createEmployeeReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: employeeData } = await axios.get(`http://localhost:6010/api/employee/${id}`);

    if (!employeeData || !employeeData.data) {
      return res.status(404).json({ error: 'Employee not found or invalid data format' });
    }
    const employee = employeeData.data;
    const pdfDoc = new PDFDocument();
    const filePath = `Employee_${employee.employee_id}.pdf`;
    const writeStream = fs.createWriteStream(filePath);
    pdfDoc.pipe(writeStream);
    pdfDoc
      .fontSize(18)
      .text('Employee Details Report', { align: 'center' })
      .moveDown();

    pdfDoc
      .fontSize(12)
      .text(`Employee ID: ${employee.employee_id}`)
      .text(`Name: ${employee.name}`)
      .text(`Department: ${employee.department_id}`)
      .text(`Salary: ${employee.salary}`)
      .text(`Email: ${employee.email}`)
      .text(`Mobile: ${employee.mobile}`)
      .moveDown();

    pdfDoc
      .fontSize(10)
      .text('Generated on: ' + new Date().toLocaleString(), { align: 'right' });
    pdfDoc.end();
    writeStream.on('finish', () => {
      res.status(200).json({
        message: 'PDF generated successfully',
        filePath,
      });
    });
  } catch (error) {
    console.error("Error creating report", error);
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
