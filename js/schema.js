// schema.js
const CATEGORIES = {
  lore: { label: "Luật & Nguyên tắc (Canon)", quyen: "I / XIII", prefix: "LORE", fields: ["quyen_lien_quan", "noi_dung", "loai"] },
  era: { label: "Đại Niên Đại", quyen: "II", prefix: "ERA", fields: ["thu_tu", "dac_trung", "van_minh_chu_dao", "the_luc_lon", "su_kien_chuyen_tiep"] },
  location: { label: "Địa điểm / Thế giới", quyen: "XII", prefix: "LOC", fields: ["loai_dia_diem", "the_gioi", "chu_quyen", "dan_so", "tai_nguyen", "nguy_hiem"] },
  species: { label: "Sinh mệnh / Chủng tộc", quyen: "III", prefix: "SPC", fields: ["nguon_goc", "cap_tri_tue", "moi_truong", "tuoi_tho", "nang_luc", "diem_yeu"] },
  realm: { label: "Cảnh giới Tu Luyện", quyen: "VI", prefix: "RLM", fields: ["thu_tu", "giai_doan", "muc_tieu", "dieu_kien_dot_pha"] },
  power_system: { label: "Hệ thống Sức mạnh", quyen: "V", prefix: "PWR", fields: ["tang", "nguon_goc", "co_che", "gioi_han", "cai_gia"] },
  profession: { label: "Nghề nghiệp / Đại Hệ Nghề", quyen: "VII", prefix: "JOB", fields: ["dai_he", "ky_nang", "cong_cu", "san_pham", "rui_ro"] },
  faction: { label: "Tổ chức / Thế lực", quyen: "VIII", prefix: "ORG", fields: ["loai_to_chuc", "muc_tieu", "nguon_luc", "lanh_dao", "quan_he_voi_the_luc_khac"] },
  technology: { label: "Khoa học / Công nghệ", quyen: "IX", prefix: "TEC", fields: ["linh_vuc", "nguyen_ly", "ung_dung", "gioi_han"] },
  nation: { label: "Quốc gia / Chính trị", quyen: "X", prefix: "NAT", fields: ["mo_hinh_nha_nuoc", "lanh_tho", "kinh_te", "phap_luat", "quan_he_ngoai_giao"] },
  culture: { label: "Văn hóa / Tư tưởng", quyen: "XI", prefix: "CUL", fields: ["gia_tri_cot_loi", "tin_nguong", "phong_tuc", "ngon_ngu"] },
  character: { label: "Nhân vật", quyen: "III / IV / VI", prefix: "CHR", fields: ["chung_toc", "canh_gioi_tu_vi", "canh_gioi_ngo_dao", "nghe_nghiep", "to_chuc", "qua_khu", "mong_muon", "noi_so", "diem_mu", "bi_mat", "quan_he"] },
  event: { label: "Sự kiện lịch sử", quyen: "II / XII", prefix: "EVT", fields: ["thoi_gian", "dia_diem", "chu_the", "nguyen_nhan", "dien_bien", "hau_qua"] },
  death_soul: { label: "Tử vong / Linh hồn / Minh Giới", quyen: "IV", prefix: "SOL", fields: ["chu_the", "loai_tu_vong", "trang_thai_linh_hon", "hau_qua"] },
  ai_council_role: { label: "Vai trò Hội đồng AI", quyen: "XIII", prefix: "AIC", fields: ["nhiem_vu", "model_de_xuat", "input", "output", "quyen_han"] },
};
const CATEGORY_ORDER = ["lore", "era", "location", "species", "realm", "power_system", "profession", "faction", "technology", "nation", "culture", "character", "event", "death_soul", "ai_council_role"];
const STATUS_OPTIONS = ["draft", "canon", "locked"];
