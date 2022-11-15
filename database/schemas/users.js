import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			default: ''
		},
		email: {
			type: String,
			required: true
		},
		image: {
			type: String,
			default: ''
		},
		position: {
			type: String,
			default: ''
		},
		rate: {
			type: String,
			default: ''
		},
		workhours: {
			timein: {
				type: String,
				default: ''
			},
			timeout: {
				type: String,
				default: ''
			}
		},
		role: {
			type: String,
			default: 'User'
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

const Users = mongoose.models.Users || mongoose.model('Users', UserSchema)

export default Users
