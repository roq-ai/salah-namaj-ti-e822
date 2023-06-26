import * as yup from 'yup';

export const invitationValidationSchema = yup.object().shape({
  invitee_email: yup.string().required(),
  role: yup.string().required(),
  inviter_id: yup.string().nullable().required(),
});
