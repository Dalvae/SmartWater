// components/Clientes/ClientCard.tsx
import React, { useState } from "react";
import moment from "moment";
import MapModal from "../ui/MapModal";
import { Client } from "@/types/Cliente/Client";
import Image from "next/image";
import {
  Phone,
  MapPin,
  User,
  Calendar,
  DollarSign,
  CreditCard,
  EllipsisVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { OpenIcon } from "../icons/Icons";
import * as Popover from "@radix-ui/react-popover";
import ConfirmDelete from "../ui/ConfirmDelete";
import { deleteClient } from "@/lib/services/ClientsService";

interface ClientCardProps {
  client: Client;
  zoneAndDistrictNames: Record<string, string>;
}

function transformImageUrl(url: string) {
  if (!url) return "";
  const baseUrl = "https://res.cloudinary.com/ddpagwxh6/image/upload/";
  const params = "w_48,q_60,f_auto";

  if (url.includes(baseUrl)) {
    const path = url.split(baseUrl)[1];
    return `${baseUrl}${params}/${path}`;
  } else {
    return url;
  }
}
export const ClientCard: React.FC<ClientCardProps> = ({
  client,
  zoneAndDistrictNames,
}) => {
  const [showMap, setShowMap] = useState(false);
  const zoneAndDistrictName = zoneAndDistrictNames[client.district] || "";
  const defaultImage = "/user.svg"; // Todo conseguir default imag <
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const imageUrl =
    client.storeImage && client.storeImage.startsWith("http")
      ? transformImageUrl(client.storeImage)
      : defaultImage;

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  const handleEdit = () => {
    alert("¡Hola!");
  };

  const handleDelete = async () => {
    try {
      await deleteClient(client._id);
      // Suponiendo que tienes un método para actualizar la lista de clientes en tu estado local
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    }
  };

  return (
    <div className="border-gray-500 flex flex-col rounded-lg shadow-lg border">
      <div className="client-details flex flex-row items-center space-x-4 m-4">
        <div className="flex items-center">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={imageUrl}
              alt="Avatar"
              fill
              sizes="100px"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
          <h3 className="text-lg ml-2 font-bold flex-grow-0">
            {client.fullName}
          </h3>
        </div>
        <div className="client-info flex flex-row items-center flex-grow">
          <p className="flex items-center text-sm flex-grow">
            <MapPin size={18} fill="black" stroke="white" className="ml-2" />{" "}
            {zoneAndDistrictName}
          </p>
          <p className="text-sm flex-grow">N° {client.code}</p>
          <p className="flex items-center text-sm flex-grow">
            <Phone size={18} className="mr-2" /> {client.phoneNumber}
          </p>
          <OpenIcon />
        </div>
      </div>
      <div className="client-stats flex flex-row justify-between items-center  m-4">
        <div className="flex items-center justify-between">
          <p className="font-bold">última venta:</p>
          <div className="rounded-xl  mx-8 px-5 py-1 shadow-md border-2 border-blue-800  text-blue-800 ">
            {moment(client.lastSale).format("DD/MM/YYYY")}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="flex items-center text-blue-800 font-bold">
            Préstamos activos:
          </p>
          <div className="m-2">
            {client.hasLoan ? "Sí" : "No"}
            {client.hasLoan && (
              <>
                <DollarSign size={18} className="ml-2 inline-block" />
                <span className="ml-1">100 Bs.</span>
              </>
            )}
          </div>
        </div>
        <Popover.Root>
          <Popover.Trigger>
            <button className="font-bold">
              <EllipsisVertical />
            </button>
          </Popover.Trigger>
          <Popover.Content className="flex flex-col bg-white rounded-md shadow-lg">
            <button
              onClick={handleEdit}
              className="hover:bg-gray-100 flex gap-4 p-4"
            >
              <Pencil />
              Editar
            </button>
            <button
              onClick={() => setIsDeleteDialogOpen(true)}
              className="hover:bg-gray-100 flex gap-4 p-4"
            >
              <Trash2 />
              Eliminar
            </button>
          </Popover.Content>
        </Popover.Root>
        <ConfirmDelete
          isOpen={isDeleteDialogOpen}
          onConfirm={() => handleDelete()}
          onCancel={() => setIsDeleteDialogOpen(false)}
        />
      </div>
      <div className="flex justify-center pb-2">
        <button
          onClick={toggleMap}
          className="flex items-center px-4 py-1  text-blue-800 rounded"
        >
          <MapPin size={18} fill="black" stroke="white" className="mr-2" />
          Ver ubicación en el mapa
        </button>
      </div>
      {showMap && (
        <MapModal
          isOpen={showMap}
          latitude={client.location.latitude}
          longitude={client.location.longitude}
          onClose={toggleMap}
        />
      )}
    </div>
  );
};

export default ClientCard;
