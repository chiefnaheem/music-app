import Head from 'next/head'
import Image from 'next/image'
import GradientLayout from '../components/GradientLayout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return <GradientLayout color="red" subtitle="profile" title="Naheem Adedokun" description="30 albums">
      <Head>Home Page</Head>
    </GradientLayout>
}
