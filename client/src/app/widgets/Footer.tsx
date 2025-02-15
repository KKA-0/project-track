export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-8 relative z-10">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Diyan.live . All rights reserved.</p>
      </div>
    </footer>
  )
}

