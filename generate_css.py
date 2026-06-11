content = """

/* Custom GTA 6 Premium Styles */
.hover-text-info:hover {
  color: #0dcaf0 !important;
  text-shadow: 0 0 10px rgba(13, 202, 240, 0.5);
}

.hover-bg-white:hover {
  background-color: white !important;
  color: black !important;
}

.text-outline {
  -webkit-text-stroke: 1px rgba(255,255,255,0.5);
  color: transparent;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #0dcaf0 #212529;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #212529;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #0dcaf0;
  border-radius: 10px;
}

/* Doctors List Hover Effects */
.doctor-list-item h3 {
  transition: all 0.3s ease;
}

.doctor-list-item:hover h3 span.text-white {
  color: #0dcaf0 !important;
}

.doctor-list-item.active h3 span.text-white {
  color: #0dcaf0 !important;
}

.doctor-list-item.active {
  background: linear-gradient(90deg, rgba(13,202,240,0.1) 0%, transparent 100%);
  border-left: 4px solid #0dcaf0;
}

.play-tour-btn:hover span.text-white {
  color: #0dcaf0 !important;
}
.play-tour-btn:hover div.bg-white {
  background-color: #0dcaf0 !important;
}
"""

with open("Frontend/src/index.css", "a") as f:
    f.write(content)

print("Appended custom CSS to index.css")
