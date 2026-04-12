import { Proposal } from "@/types/proposal";

import Img1 from "@/public/images/clients_imgs/joão_silva_img.avif"
import ImgDoc1 from "@/public/images/clients_imgs/joão_silva_doc.avif"
import Img2 from "@/public/images/clients_imgs/maria_souza_img.avif"
import ImgDoc2 from "@/public/images/clients_imgs/maria_souza_doc.avif"
import Img3 from "@/public/images/clients_imgs/carlos_lima_img.avif"
import ImgDoc3 from "@/public/images/clients_imgs/carlos_lima_doc.avif"
import Img4 from "@/public/images/clients_imgs/ana_pereira_img.avif"
import ImgDoc4 from "@/public/images/clients_imgs/ana_pereira_doc.avif"
import Img5 from "@/public/images/clients_imgs/lucas_fernandes_img.avif"
import ImgDoc5 from "@/public/images/clients_imgs/lucas_fernandes_doc.avif"

export const proposals: Proposal[] = [
  {
    id: "1001",
    clientName: "João Silva",
    status: "PENDING",
    updatedAt: new Date().toISOString(),
    link: "https://sign.com/1001",
    cpf: "123.456.789-00",
    signedAt: new Date().toISOString(),
    ip: "192.168.0.1",
    latitude: -25.42,
    longitude: -49.27,
    selfieUrl: Img1.src, 
    documentoUrl: ImgDoc1.src,
    similarityScore: 90
  },
  {
    id: "1002",
    clientName: "Maria Souza",
    status: "SIGNED",
    updatedAt: "2026-04-08T14:30:00.000Z",
    link: "https://sign.com/1002",
    cpf: "987.654.321-00",
    signedAt: "2026-04-08T14:30:00.000Z",
    ip: "172.16.0.2",
    latitude: -23.55,
    longitude: -46.63,
    selfieUrl: Img2.src, 
    documentoUrl: ImgDoc2.src,
    similarityScore: 99
  },
  {
    id: "1003",
    clientName: "Carlos Lima",
    status: "REJECTED",
    updatedAt: "2026-04-10T11:30:00.000Z",
    link: "https://sign.com/1003",
    cpf: "456.123.789-00",
    signedAt: "2026-04-10T11:30:00.000Z",
    ip: "10.0.0.3",
    latitude: -22.90,
    longitude: -43.20,
    selfieUrl: Img3.src, 
    documentoUrl: ImgDoc3.src,
    similarityScore: 22
  },
  {
    id: "1004",
    clientName: "Ana Pereira",
    status: "EXPIRED",
    updatedAt: new Date().toISOString(),
    link: "https://sign.com/1004",
    cpf: "321.654.987-00",
    signedAt: new Date().toISOString(),
    ip: "192.168.1.10",
    latitude: -30.03,
    longitude: -51.23,
    selfieUrl: Img4.src, 
    documentoUrl: ImgDoc4.src,
    similarityScore: 88
  },
  {
    id: "1005",
    clientName: "Lucas Fernandes De Souza Pereira Dos Santos Canalle Giorgino Algusto De Ouro e Pedra Mar Lua e sol",
    status: "SIGNED",
    updatedAt: new Date().toISOString(),
    link: "https://sign.com/1005",
    cpf: "159.753.486-00",
    signedAt: new Date().toISOString(),
    ip: "8.8.8.8",
    latitude: -15.78,
    longitude: -47.93,
    selfieUrl: Img5.src, 
    documentoUrl: ImgDoc5.src,
    similarityScore: 90
  },
];