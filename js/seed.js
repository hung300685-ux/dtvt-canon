function mk(category, name, summary, fields = {}, status = "canon") {
  return {
    id: genId(CATEGORIES[category].prefix),
    category, name, summary, fields, tags: [], status,
    createdAt: Date.now(), updatedAt: Date.now(),
  };
}

function buildSeedData() {
  const entries = [];

  const quyenList = [
    ["Quyển I — Hiến Pháp ĐTVT", "10 nguyên tắc nền tảng: tính nhất quán, nhân quả, cái giá, chủ thể tính, tự vận hành, không tuyệt đối hóa, thông tin có giá trị, thời gian, quy luật lớn hơn cá nhân, giá trị nhân văn."],
    ["Quyển II — Vũ Trụ · Không Gian · Thời Gian · Đại Niên Đại", "Cấu trúc không gian đa tầng và 10 Đại Niên Đại của lịch sử ĐTVT."],
    ["Quyển III — Sinh Mệnh · Sinh Thái · Linh Sinh Vật · Tiến Hóa", "Định nghĩa sinh mệnh, nguồn gốc, cấu trúc (Thân-Năng lượng-Ý thức-Linh hồn-Bản nguyên), phân loại trí tuệ 6 cấp, sinh thái và tiến hóa."],
    ["Quyển IV — Tử Vong · Linh Hồn · Minh Giới · Luân Hồi", "Các loại tử vong, cấu trúc linh hồn, Minh Giới, luân hồi, hồi sinh 5 cấp độ."],
    ["Quyển V — Hệ Thống Sức Mạnh Tổng Hợp", "Công thức sức mạnh tổng hợp gồm 18 thành phần, 5 đại tầng sức mạnh, 2 trục Tu Vi/Ngộ Đạo."],
    ["Quyển VI — Hệ Thống Tu Luyện Chính Thống", "16 cảnh giới tu vi chính thức, Ngũ Đại Căn Cơ (Thể-Hồn-Đạo Cung-Đạo Văn-Linh Hải)."],
    ["Quyển VII — Nghề Nghiệp · Kỹ Nghệ · Hệ Thống Ngành Nghề", "50 Đại Hệ Nghề → ~1.000 nghề nghiệp chuyên môn."],
    ["Quyển VIII — Tổ Chức · Thế Lực · Xã Hội · Văn Minh", "Các tầng tổ chức từ cá nhân đến siêu văn minh, 10 chỉ số đánh giá văn minh."],
    ["Quyển IX — Khoa Học · Công Nghệ · Tri Thức · Văn Minh Tiến Hóa", "Phương pháp khoa học, các nhánh khoa học/công nghệ, AI trong ĐTVT."],
    ["Quyển X — Chính Trị · Kinh Tế · Pháp Luật · Quản Trị · Địa Chính Trị", "6 trụ cột Statecraft: Chính trị, Kinh tế, Pháp luật, Quản trị, Nhà nước, Địa chính trị."],
    ["Quyển XI — Văn Hóa · Tư Tưởng · Tâm Linh · Giá Trị · Bản Sắc", "Văn hóa, giá trị, đạo đức, tôn giáo, ký ức tập thể, bản sắc văn minh."],
    ["Quyển XII — Đại Địa Chí · Địa Lý · Bản Đồ · Không Gian Văn Minh", "Atlas Canon: cấu trúc không gian từ ĐTVT → Vũ Trụ → Tinh Vực → Thế Giới → địa điểm cụ thể."],
    ["Quyển XIII — Canon · Luật Sáng Tạo · Kiến Trúc Truyện · Hội Đồng AI", "Hệ điều hành sáng tạo: Canon, Continuity Protocol, Error Archive, Hội đồng AI."],
  ];
  quyenList.forEach(([name, summary], i) => {
    entries.push(mk("lore", name, summary, { quyen_lien_quan: `Quyển ${i + 1}`, loai: "Quyển nền tảng" }, "locked"));
  });

  const eras = [
    ["Đại Niên Đại I — Khai Thiên", "Giai đoạn hình thành cấu trúc nền tảng của vũ trụ."],
    ["Đại Niên Đại II — Sinh Mệnh", "Sự xuất hiện và đa dạng hóa của sinh mệnh."],
    ["Đại Niên Đại III — Văn Minh", "Các chủng tộc bắt đầu hình thành xã hội và nền văn minh."],
    ["Đại Niên Đại IV — Đạo Khởi", "Sinh mệnh bắt đầu nhận thức và khai phá các con đường siêu phàm."],
    ["Đại Niên Đại V — Chư Đạo Tranh Minh", "Nhiều hệ thống đạo, pháp và văn minh cùng phát triển."],
    ["Đại Niên Đại VI — Văn Minh Đại Hưng", "Khoa học, kỹ nghệ, tu luyện và tổ chức xã hội đạt bước phát triển lớn."],
    ["Đại Niên Đại VII — Đại Biến", "Các hệ thống lớn va chạm, tạo ra biến động toàn vũ trụ."],
    ["Đại Niên Đại VIII — Tái Cấu Trúc", "Các thế lực và văn minh xây dựng lại trật tự."],
    ["Đại Niên Đại IX — Chư Giới Giao Hội", "Các thế giới, tinh vực và nền văn minh ngày càng liên kết."],
    ["Đại Niên Đại X — Thời Đại Hiện Hành", "Thời kỳ mà các tác phẩm chính có thể diễn ra."],
  ];
  eras.forEach(([name, summary], i) => {
    entries.push(mk("era", name, summary, { thu_tu: i + 1 }, "canon"));
  });

  const realms = ["Luyện Thể", "Luyện Khí", "Khai Mạch", "Tụ Linh", "Đạo Cung", "Đạo Văn", "Ngưng Văn", "Hóa Văn", "Đạo Vực", "Pháp Tắc", "Chưởng Pháp", "Hợp Đạo", "Đạo Quân", "Đạo Tôn", "Đạo Đế", "Thiên Đạo Cảnh"];
  const giaiDoan = ["I — Phàm Thể", "I — Phàm Thể", "I — Phàm Thể", "I — Phàm Thể", "II — Đạo Cơ", "II — Đạo Cơ", "III — Đạo Văn Hóa", "III — Đạo Văn Hóa", "III — Đạo Văn Hóa", "IV — Pháp Tắc", "IV — Pháp Tắc", "IV — Pháp Tắc", "V — Đại Đạo/Thiên Đạo", "V — Đại Đạo/Thiên Đạo", "V — Đại Đạo/Thiên Đạo", "V — Đại Đạo/Thiên Đạo"];
  realms.forEach((name, i) => {
    entries.push(mk("realm", name, `Cảnh giới thứ ${i + 1}/16 trong hệ thống Tu Luyện Chính Thống.`, { thu_tu: i + 1, giai_doan: giaiDoan[i] }, "locked"));
  });

  const jobs = ["Nông Nghiệp", "Khai Khoáng", "Năng Lượng", "Luyện Khí", "Luyện Đan", "Y Dược", "Trận Pháp", "Phù Văn", "Khôi Lỗi", "Kiến Trúc", "Cơ Khí", "Công Nghệ", "Thông Tin", "Khoa Học", "Giáo Dục", "Nghiên Cứu", "Thương Mại", "Tài Chính", "Kế Toán — Đo Lường", "Pháp Luật", "Hành Chính", "Chính Trị", "Ngoại Giao", "Quân Sự", "An Ninh", "Giao Thông", "Hàng Hải", "Hàng Không", "Không Gian", "Địa Lý", "Khí Tượng", "Môi Trường", "Sinh Học", "Thú Y", "Linh Thú", "Linh Trùng", "Linh Thực", "Nghệ Thuật", "Văn Học", "Truyền Thông", "Giải Trí", "Thể Thao", "Tâm Lý", "Xã Hội Học", "Lịch Sử", "Tôn Giáo — Tín Niệm", "Triết Học", "Dịch Vụ", "Quản Lý", "Nghề Đặc Thù"];
  jobs.forEach((name, i) => {
    entries.push(mk("profession", name, `Đại Hệ Nghề thứ ${i + 1}/50.`, { dai_he: name }, "locked"));
  });

  const aiRoles = [
    ["Canon AI", "Kiểm tra nội dung mới so với Canon đã khóa."],
    ["Logic AI", "Kiểm tra logic nhân quả, sức mạnh, thế giới."],
    ["Character AI", "Kiểm tra tính chủ thể, động cơ, OOC của nhân vật."],
    ["World AI", "Kiểm tra tính nhất quán worldbuilding."],
    ["Continuity AI", "Theo dõi trạng thái truyện qua các chương (Story State)."],
    ["Pacing AI", "Kiểm tra nhịp độ, tỷ trọng chiến đấu/thoại/nội tâm."],
    ["Mystery AI", "Kiểm tra foreshadow, payoff, mystery có hợp lý không."],
    ["Philosophy AI", "Kiểm tra chiều sâu tư tưởng, giá trị nhân văn."],
    ["Science AI", "Kiểm tra logic khoa học/công nghệ nếu có."],
    ["Economics AI", "Kiểm tra logic kinh tế, tài nguyên, thị trường."],
    ["Reader AI (Simulated Readers)", "Mô phỏng phản ứng của nhiều kiểu độc giả."],
    ["Independent Critic", "Đánh giá như người ngoài, không giả định biết Canon nội bộ."],
  ];
  aiRoles.forEach(([name, nhiemVu]) => {
    entries.push(mk("ai_council_role", name, nhiemVu, { nhiem_vu: nhiemVu, model_de_xuat: "" }, "canon"));
  });

  entries.push(mk("power_system", "Công thức Sức mạnh Tổng hợp",
    "Khung phân tích 18 thành phần sức mạnh — không phải phép cộng số học tuyệt đối, các thành phần khuếch đại/hạn chế/triệt tiêu lẫn nhau.",
    {
      tang: "Toàn bộ 5 tầng", nguon_goc: "Quyển V",
      co_che: "Tu vi + Thân thể + Linh hồn + Đạo Cung + Đạo Văn + Công pháp + Kỹ thuật + Võ đạo + Binh khí + Phù trận + Khôi lỗi + Linh thú + Linh trùng + Linh thực + Kinh nghiệm + Hoàn cảnh + Tài nguyên + Chiến thuật",
      gioi_han: "Cảnh giới cao không đồng nghĩa tuyệt đối với chiến thắng.", cai_gia: "—",
    }, "locked"));

  return entries;
}

async function ensureSeeded() {
  const count = await DTVT_DB.count();
  if (count === 0) {
    const data = buildSeedData();
    await DTVT_DB.bulkPut(data);
    console.log(`[DTVT] Đã nạp ${data.length} mục Canon khởi tạo.`);
  }
}
