//API for adding doctor

const addDoctor = async (req, res) => {
  console.log("image here");
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file ? req.file.path : undefined;
    console.log("image file ", imageFile);

    console.log(
      {
        name,
        email,
        password,
        speciality,
        degree,
        experience,
        about,
        fees,
        address,
      },
      imageFile
    );
    res.status(200).json({ message: "Success" });
  } catch (error) {}
};

export { addDoctor };
