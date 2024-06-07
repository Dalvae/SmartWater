import * as z from "zod";

export const addClientInputSchema = z
  .object({
    storeImage: z.string().min(1, "La imagen de la tienda es requerida"),
    fullName: z.string().min(4, "El nombre completo es requerido"),
    phoneNumber: z
      .string()
      .min(8, "El número de teléfono debe tener al menos 8 dígitos"),
    email: z.string().email("El correo electrónico no es válido").optional(),
    address: z.string().min(4, "La dirección es requerida"),
    comment: z.string().optional(),
    ciFrontImage: z
      .string()
      .min(1, "La imagen del carnet (delantero) es requerida"),
    ciBackImage: z
      .string()
      .min(1, "La imagen del carnet (trasero) es requerida"),
    zone: z.string().min(1, "La zona es requerida"),
    district: z.string().min(1, "El distrito es requerido"),
    location: z.object({
      latitude: z.string().min(1, "La latitud es requerida"),
      longitude: z.string().min(1, "La longitud es requerida"),
    }),
    renewInDays: z.number().min(1, "El período de renovación es requerido"),
    billingInfo: z.object({
      NIT: z.string().nonempty("El NIT es requerido"),
      // phoneNumber: z
      //   .string()
      //   .min(8, "El número de teléfono de facturación es requerido"),
    }),
    isClient: z.boolean().optional(),
    isAgency: z.boolean().optional(),
  })
  .refine((data) => data.isClient || data.isAgency, {
    message:
      "Al menos uno de los campos 'Cliente habitual' o 'Agencia' debe ser verdadero",
    path: ["isClient", "isAgency"],
  });

export type AddClientInput = z.infer<typeof addClientInputSchema>;

export const addClient = async (data: AddClientInput) => {
  let frontCarnetImage: File | undefined;
  let backCarnetImage: File | undefined;

  if (data.ciFrontImage && data.ciBackImage) {
    frontCarnetImage = await convertUrlToFile(
      data.ciFrontImage,
      `${data.fullName}-carnetDelantero.jpg`
    );
    backCarnetImage = await convertUrlToFile(
      data.ciBackImage,
      `${data.fullName}-carnetTrasero.jpg`
    );
  } else {
    throw new Error("No se encontraron imágenes del carnet");
  }

  const coordinates = await getCoordinates(data.address);
  const storeImageUrl = await saveImage(data.storeImage);
  const frontCarnetImageUrl = await saveImage(frontCarnetImage);
  const backCarnetImageUrl = await saveImage(backCarnetImage);

  const clientData = {
    ...data,
    location: coordinates,
    storeImage: storeImageUrl.secure_url,
    ciFrontImage: frontCarnetImageUrl.secure_url,
    ciBackImage: backCarnetImageUrl.secure_url,
  };

  const response = await fetch("/api/clients/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  });

  if (!response.ok) {
    throw new Error("Error al registrar el cliente");
  }

  return response.json();
};

const getCoordinates = async (address: string) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}`;
  const response = await fetch(url);
  const data = await response.json();
  let latitude = "0",
    longitude = "0";

  if (data.length > 0) {
    latitude = data[0].lat;
    longitude = data[0].lon;
  } else {
    console.error("No se encontraron coordenadas");
  }

  return { latitude, longitude };
};

export const saveImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "nn9rw8nv");
  formData.append("api_key", "799292358463167");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/ddpagwxh6/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const responseData = await response.json();
  return responseData;
};

const convertUrlToFile = async (
  url: string,
  fileName: string
): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], fileName);
};
