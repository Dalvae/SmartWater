import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Camera, Phone, ImagePlus } from "lucide-react";
import { useNotifications } from "@/components/ui/notifications";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalBody,
} from "@/components/ui/modal/modal";
import { Input, Label, Select, Switch, Form } from "@/components/ui/form";
import {
  addClient,
  addClientInputSchema,
  AddClientInput,
  saveImage,
} from "./api/addclient";
import useAppStore from "@/store/appStore";
import { fetchZones } from "@/hooks/fetchZones";
import { Zone, District } from "../../types/Zones/Zones";

interface AgregarClienteProps {
  onClose: () => void;
}
export const AgregarCliente2: React.FC = () => {
  const setZones = useAppStore((state) => state.setZones);
  const zones = useAppStore((state) => state.zones);
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotifications();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageCarnetTrasero, setImageCarnetTrasero] = useState<string | null>(
    null
  );
  const [imageCarnetDelantero, setImageCarnetDelantero] = useState<
    string | null
  >(null);
  const [isClient, setIsClient] = useState(false);
  const [isAgency, setIsAgency] = useState(false);

  useEffect(() => {
    const fetchZonesData = async () => {
      const zones = await fetchZones();
      setZones(zones);
    };

    fetchZonesData();
  }, [setZones]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddClientInput>({
    resolver: zodResolver(addClientInputSchema),
  });

  console.log("Errores del formulario:", errors);

  const handleSelectImage = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      try {
        const response = await saveImage(file);
        setSelectedImage(response.secure_url);
      } catch (error) {
        console.error("Error saving image:", error);
        addNotification({
          type: "error",
          title: "Error al guardar la imagen",
        });
      }
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: (value: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: AddClientInput) => {
    console.log("Datos del formulario:", data);
    try {
      setIsLoading(true);

      if (!selectedImage) {
        addNotification({
          type: "error",
          title: "La imagen de la tienda es requerida",
        });
        setIsLoading(false);
        return;
      }

      const clientData = {
        ...data,
        storeImage: selectedImage,
        ciFrontImage: imageCarnetDelantero ?? "",
        ciBackImage: imageCarnetTrasero ?? "",
        ...(isClient !== undefined && { isClient }),
        ...(isAgency !== undefined && { isAgency }),
        renewInDays: 10,
      };

      await addClient(clientData);
      addNotification({
        type: "success",
        title: "Cliente registrado correctamente",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error al registrar el cliente:", error);
      addNotification({
        type: "error",
        title: "Error al registrar el cliente",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleZoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedZoneId = event.target.value;
    console.log("Selected Zone ID:", selectedZoneId);

    const selectedZone = zones.find((zone) => zone._id === selectedZoneId);
    console.log("Selected Zone:", selectedZone);

    if (selectedZone) {
      console.log("Selected Zone Districts:", selectedZone.districts);
      setFilteredDistricts(selectedZone.districts);
      setValue("district", ""); // Reinicia el valor del distrito al cambiar de zona
    } else {
      setFilteredDistricts([]);
    }
  };

  // const handleDistrictChange = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const selectedDistrictId = event.target.value;
  //   setValue("district", selectedDistrictId); // Utiliza setValue de react-hook-form para actualizar el valor
  // };
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-blue-800 text-white rounded-full p-4 w-24 h-24 flex flex-col items-center justify-center"
      >
        <Plus />
        Agregar
      </Button>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent className="w-11/12 max-w-2xl">
          <ModalHeader>
            <ModalTitle className="text-lg font-semibold text-blue-900">
              Registrar Cliente
            </ModalTitle>
          </ModalHeader>
          <ModalBody className="overflow-y-auto max-h-[70vh] px-1">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              schema={addClientInputSchema}
            >
              {({ register, formState }) => (
                <>
                  <div className="flex flex-col items-center gap-6 relative">
                    {selectedImage ? (
                      <img
                        className="w-24 h-24 rounded-full overflow-hidden"
                        src={selectedImage}
                        alt=""
                        onClick={handleSelectImage}
                      />
                    ) : (
                      <div
                        className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center"
                        onClick={handleSelectImage}
                      >
                        <span className="text-5xl font-semibold text-white">
                          LV
                        </span>
                      </div>
                    )}
                    <button
                      type="button"
                      className="focus:outline-none absolute bottom-2 right-[43%]"
                      onClick={handleSelectImage}
                    >
                      <Camera className="w-7 h-7 text-black" />
                    </button>
                    <Input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  <div className="flex gap-4 mt-2">
                    <div>
                      <Label className="text-sm font-normal" htmlFor="fullName">
                        Nombre
                      </Label>
                      <Input
                        className="w-full border border-black rounded-md px-4 py-2 text-center text-sm"
                        placeholder="Juan Alvarez"
                        id="fullName"
                        {...register("fullName")}
                      />
                      {formState.errors.fullName && (
                        <span className="error">
                          {formState.errors.fullName.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-normal" htmlFor="bill">
                        Datos de facturación
                      </Label>
                      <Input
                        className="w-full border border-black rounded-md px-4 py-2 text-center text-sm"
                        id="bill"
                        {...register("bill")}
                      />
                      {formState.errors.bill && (
                        <span className="error">
                          {formState.errors.bill.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 flex flex-col gap-1">
                      <Label className="text-sm font-normal" htmlFor="bill">
                        Número de NIT
                      </Label>
                      <Input
                        className="w-full border border-black rounded-md px-4 py-2 text-center text-sm"
                        id="NIT"
                        {...register("NIT")}
                      />
                      {formState.errors.NIT && (
                        <span className="error">
                          {formState.errors.NIT.message}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <Label className="text-sm font-normal" htmlFor="bill">
                        Correo Electectronico
                      </Label>
                      <Input
                        className="w-full border border-black rounded-md px-4 py-2 text-center text-sm"
                        placeholder="juan@gmail.com"
                        id="email"
                        {...register("email")}
                      />
                      {formState.errors.email && (
                        <span className="error">
                          {formState.errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col ">
                    <Label
                      className="text-sm font-normal"
                      htmlFor="phoneNumber"
                    >
                      Número de Teléfono
                    </Label>
                    <div className="flex w-full ">
                      <div className="h-9 w-12 mt-1 flex items-center justify-center border border-black rounded-l-md">
                        <Phone />
                      </div>
                      <div className="flex-grow pr-2">
                        <Input
                          className="w-full h-9 border border-black rounded-r-md rounded-l-none px-4 py-2 text-center text-sm"
                          placeholder="70918627"
                          id="phoneNumber"
                          {...register("phoneNumber")}
                          handlezo
                        />
                      </div>
                    </div>

                    {formState.errors.phone && (
                      <span className="error">
                        {formState.errors.phone.message}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <Label className="text-sm font-normal" htmlFor="address">
                        Dirección
                      </Label>
                      <Input
                        className="w-full border border-black rounded-md px-4 py-2 text-center text-sm"
                        id="address"
                        {...register("address")}
                      />
                      {formState.errors.address && (
                        <span className="error">
                          {formState.errors.address.message}
                        </span>
                      )}
                    </div>
                    <div>
                      {/* referencia no aparece en el objeto cliente del backend */}
                      <Label className="text-sm font-normal" htmlFor="address">
                        Referencia
                      </Label>
                      <Input
                        className="w-full border border-black rounded-md px-4 py-2 text-center text-sm"
                        id="address"
                        {...register("reference")}
                      />
                      {formState.errors.address && (
                        <span className="reference">
                          {formState.errors.reference.message}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* -- zona y distro */}
                  <div className="flex gap-4">
                    <div className=" flex flex-col gap-1 w-full">
                      <Label className="text-sm font-normal" htmlFor="zone">
                        Zona
                      </Label>
                      <Select
                        className="w-full border border-black rounded-md px-4 py-2 text-center text-sm"
                        id="zone"
                        {...register("zone")}
                        onChange={handleZoneChange}
                        options={zones.map((zone) => ({
                          label: zone.name,
                          value: zone._id,
                        }))}
                      />
                      {formState.errors.zone && (
                        <span className="error">
                          {formState.errors.zone.message}
                        </span>
                      )}
                    </div>
                    <div className="w-full">
                      <Label className="text-sm font-normal" htmlFor="district">
                        Distrito
                      </Label>
                      <Select
                        className="w-full border border-black rounded-md px-4 py-2 text-center text-sm"
                        id="district"
                        {...register("district")}
                        options={filteredDistricts.map((district) => ({
                          label: district.name,
                          value: district._id,
                        }))}
                      />
                      {formState.errors.district && (
                        <span className="error">
                          {formState.errors.district.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row justify-around items-center mt-4 gap-4">
                    <Label className="text-sm font-normal">
                      Cliente
                      <Switch
                        id="isClient"
                        className="ml-2"
                        checked={isClient}
                        onCheckedChange={(checked) => {
                          setIsClient(checked);
                          if (checked) setIsAgency(false);
                        }}
                      />
                    </Label>
                    <Label className="text-sm  font-normal">
                      Agencia
                      <Switch
                        id="isAgency"
                        className="ml-2"
                        checked={isAgency}
                        onCheckedChange={(checked) => {
                          setIsAgency(checked);
                          if (checked) setIsClient(false);
                        }}
                      />
                    </Label>
                  </div>
                  {/* Agregar imagenes */}
                  <div className="flex  flex-col gap-4">
                    <div className="flex flex-col items-center mt-4">
                      <div className="w-full min-h-[25vh] p-4 self-stretch rounded-3xl bg-gray-300 ">
                        <Label
                          className="text-sm font-normal mb-2 text-center w-full"
                          htmlFor="imageCarnetDelantero"
                        >
                          Carnet delantero
                        </Label>
                        <div
                          className=" w-full items-center flex border-2 border-gray-400 border-dashed rounded-lg p-2  h-full cursor-pointer"
                          onClick={() =>
                            document
                              .getElementById("imageCarnetDelanteroInput")
                              ?.click()
                          }
                        >
                          {imageCarnetDelantero ? (
                            <img
                              src={imageCarnetDelantero}
                              alt="Carnet delantero"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImagePlus className="text-gray-600 w-32 h-32 mx-auto p-4" />
                          )}
                        </div>
                      </div>
                      <Input
                        type="file"
                        id="imageCarnetDelanteroInput"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageChange(e, setImageCarnetDelantero)
                        }
                      />
                    </div>
                    <div className="w-full min-h-[25vh] p-4 self-stretch rounded-3xl bg-gray-300 ">
                      <Label
                        className="text-sm font-normal mb-2"
                        htmlFor="imageCarnetTrasero"
                      >
                        Carnet trasero
                      </Label>
                      <div
                        className=" w-full items-center flex border-2 border-gray-400 border-dashed rounded-lg p-2  h-full cursor-pointer"
                        onClick={() =>
                          document
                            .getElementById("imageCarnetTraseroInput")
                            ?.click()
                        }
                      >
                        {imageCarnetTrasero ? (
                          <img
                            src={imageCarnetTrasero}
                            alt="Carnet trasero"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImagePlus className="text-gray-600 w-32 h-32 mx-auto" />
                        )}
                      </div>
                      <Input
                        type="file"
                        id="imageCarnetTraseroInput"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageChange(e, setImageCarnetTrasero)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-evenly">
                    <Button
                      onClick={() => setOpen(false)}
                      className="bg-gray-400 text-white rounded-full px-6 py-4"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className=" bg-blue-800 text-white rounded-full py-4 px-6"
                    >
                      Registrar
                    </Button>
                  </div>
                </>
              )}
            </Form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
