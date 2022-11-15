import mongoose from 'mongoose'

const WorkhourSchema = mongoose.Schema(
	{
		timein: {
			type: String,
			default: ''
		},
		timeout: {
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

const Workhours = mongoose.models.Workhours || mongoose.model('Workhours', WorkhourSchema)

export default Workhours
