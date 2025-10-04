export class ListShareController {
 constructor(createShare, getSharedList, GetToken) {
  this.createListShare = createShare;
  this.getShared = getSharedList;
  this.GetToken = GetToken;
 }

 createShare = async (req, res) => {
  try {
   const { list_id, permission } = req.body;
   console.log('create share\n list id, permission', list_id, permission);
   const listShareDTO = await this.createListShare.execute({
    list_id,
    permission,
   });
   res.status(201).json(listShareDTO);
  } catch (err) {
   return res.status(400).json({ error: err.message });
  }
 };

 getSharedList = async (req, res) => {
  try {
   const token = req.params.token;
   const sharedData = await this.getShared.execute(token);
   res.status(200).json(sharedData);
  } catch (err) {
   res.status(400).json({ error: err.message });
  }
 };

 findByToken = async (token) => {
  const ownerDTO = await this.GetToken.execute(token);
  return ownerDTO;
 };
}
