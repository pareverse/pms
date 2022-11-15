import mongoose from 'mongoose'

const DeductionSchema = mongoose.Schema(
	{
		title: {
			type: String,
			default: ''
		},
		amount: {
			type: String,
			default: ''
		},
		created: {
			type: String,
			default: ''
		},
		updated: {
			type: String,
			default: ''
		}
	},
	{ timestamps: true }
)

const Deductions = mongoose.models.Deductions || mongoose.model('Deductions', DeductionSchema)

export default Deductions
