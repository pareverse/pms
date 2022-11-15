import mongoose from 'mongoose'

const PositionSchema = mongoose.Schema(
	{
		title: {
			type: String,
			default: ''
		},
		rate: {
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

const Positions = mongoose.models.Positions || mongoose.model('Positions', PositionSchema)

export default Positions
