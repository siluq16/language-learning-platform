# Hiểu Ý Định Truy Vấn Tìm Kiếm Bằng Học Sâu
### (Deep Search Query Intent Understanding)

**Tác giả:** Xiaowei Liu, Weiwei Guo, Huiji Gao, Bo Long
**Đơn vị:** LinkedIn, Mountain View, California
**Hội nghị:** CIKM 2020, Galway, Ireland
**arXiv:** 2008.06759v2 [cs.CL], 18/08/2020

> *Bản dịch tiếng Việt. Các thuật ngữ kỹ thuật phổ biến (embedding, latency, A/B test, blending, typeahead, SERP...) được giữ nguyên tiếng Anh để dễ đối chiếu với bản gốc.*

---

## TÓM TẮT (ABSTRACT)

Hiểu được ý định (intent) của người dùng đằng sau một truy vấn tìm kiếm là yếu tố then chốt cho sự thành công của các công cụ tìm kiếm hiện đại. Dự đoán chính xác ý định truy vấn giúp công cụ tìm kiếm phục vụ tốt hơn nhu cầu của người dùng bằng cách hiển thị kết quả từ các danh mục phù hợp hơn. Bài báo này nhằm cung cấp một framework học toàn diện để mô hình hóa ý định truy vấn ở các giai đoạn khác nhau của quá trình tìm kiếm. Chúng tôi tập trung vào thiết kế cho: 1) dự đoán ý định của người dùng ngay khi họ đang gõ truy vấn (on-the-fly) trong typeahead search bằng các mô hình mức ký tự (character-level); và 2) các mô hình dự đoán ý định mức từ (word-level) chính xác cho các truy vấn hoàn chỉnh. Nhiều thành phần học sâu để hiểu văn bản truy vấn đã được thử nghiệm. Các đánh giá offline và thử nghiệm A/B online cho thấy các phương pháp đề xuất hiệu quả trong việc hiểu ý định truy vấn, đồng thời đủ hiệu năng để mở rộng cho các hệ thống tìm kiếm online.

**Từ khóa:** Query Intent (ý định truy vấn), Query Classification (phân loại truy vấn), Natural Language Processing (xử lý ngôn ngữ tự nhiên), Deep Learning (học sâu)

---

## 1. GIỚI THIỆU

Các công cụ tìm kiếm hiện đại cung cấp dịch vụ tìm kiếm chuyên biệt trên nhiều lĩnh vực khác nhau (ví dụ: tin tức, sách, du lịch). Người dùng đến với công cụ tìm kiếm để tìm thông tin với nhiều ý định khác nhau: chọn nhà hàng yêu thích, kiểm tra giờ mở cửa hoặc địa chỉ nhà hàng trên Yelp; tìm kiếm con người, tìm cơ hội việc làm, tìm thông tin công ty trên LinkedIn, v.v. Hiểu được ý định của người tìm kiếm là yếu tố then chốt cho sự thành công của các hệ thống tìm kiếm. Truy vấn chứa nhiều thông tin văn bản phong phú do chính người tìm kiếm cung cấp một cách tường minh, do đó là chỉ báo mạnh về ý định của họ. Việc hiểu ý định tiềm ẩn của người tìm kiếm từ truy vấn được gọi là bài toán mô hình hóa ý định truy vấn (query intent modeling).

Ý định truy vấn là một thành phần quan trọng trong hệ sinh thái công cụ tìm kiếm [12, 16, 20]. Như thể hiện ở Hình 1, khi người dùng bắt đầu gõ truy vấn, ý định được dự đoán dựa trên chuỗi ký tự chưa hoàn chỉnh; khi người dùng gõ xong toàn bộ truy vấn, một ý định chính xác hơn được dự đoán dựa trên truy vấn hoàn chỉnh. Hiểu chính xác ý định người dùng cho phép công cụ tìm kiếm kích hoạt các vertical search tương ứng, cũng như xếp hạng tốt hơn các tài liệu được truy xuất dựa trên ý định [2], nhờ đó người dùng không phải tinh chỉnh tìm kiếm bằng cách điều hướng tường minh qua các facet khác nhau của công cụ tìm kiếm.

Các phương pháp truyền thống dựa vào biểu diễn bag-of-words và các đặc trưng dựa trên luật để phân loại ý định [2, 3]. Gần đây, các mô hình dựa trên học sâu [10] cho thấy cải thiện đáng kể, có thể xử lý tốt các từ tương tự nhau/phân biệt nghĩa của từ. Tuy nhiên, việc phát triển các mô hình ý định truy vấn dựa trên học sâu cho môi trường production đòi hỏi phải xem xét một số thách thức. Thứ nhất, các mô hình production có yêu cầu độ trễ (latency) rất nghiêm ngặt, toàn bộ quá trình cần hoàn thành trong vài chục mili giây. Thứ hai, các truy vấn thường chỉ có hai hoặc ba từ (với truy vấn hoàn chỉnh) hoặc vài ký tự (với truy vấn chưa hoàn chỉnh), nên ngữ cảnh bị hạn chế.

Bài báo này đề xuất một framework học sâu thực tiễn để giải quyết hai thách thức trên, với mục tiêu cải thiện công cụ tìm kiếm thương mại của LinkedIn. Hai thành phần trộn kết quả tìm kiếm (search result blending) mà ở đó ý định truy vấn hữu ích đã được xác định: ý định của truy vấn chưa hoàn chỉnh cho typeahead blending, và ý định của truy vấn hoàn chỉnh cho SERP blending (SERP: search engine result page, trang kết quả tìm kiếm).

Điểm chung của cả hai hệ thống là dùng ý định truy vấn để hỗ trợ xếp hạng các tài liệu thuộc nhiều loại khác nhau được truy xuất. Đồng thời, hai sản phẩm có những thách thức riêng. Typeahead blending có yêu cầu latency rất chặt; đầu vào là truy vấn chưa hoàn chỉnh (một chuỗi ký tự); và chấp nhận được việc trả về dự đoán "mờ" (fuzzy), vì người dùng sẽ tiếp tục gõ toàn bộ truy vấn nếu họ không thấy kết quả phù hợp. Ngược lại, SERP blending có ràng buộc latency thoải mái hơn typeahead nhưng đòi hỏi độ chính xác cao hơn vì nó ảnh hưởng trực tiếp đến trang kết quả tìm kiếm.

Dựa trên đặc điểm của các ứng dụng production, chúng tôi đề xuất các giải pháp khác nhau. Với typeahead blending, biểu diễn truy vấn mức ký tự được sử dụng vì các mô hình thu được nhỏ gọn về số lượng tham số. Đồng thời, nó xử lý đa ngôn ngữ tốt nhờ kích thước từ vựng nhỏ. Với SERP blending, mô hình ý định cho truy vấn hoàn chỉnh là mức từ. Vì độ chính xác là tiêu chuẩn cao, BERT được khảo sát để trích xuất biểu diễn truy vấn, dẫn đến một mô hình vững chắc hơn.

Bài báo này được thúc đẩy bởi việc giải quyết các thách thức trong dự đoán ý định truy vấn, đồng thời đáp ứng nhu cầu production để tạo ra tác động thực tế cho các hệ thống tìm kiếm. Các đóng góp chính gồm:

- Phát triển một framework hiểu ý định truy vấn bằng học sâu thực tiễn, có thể thích ứng với nhiều kịch bản sản phẩm trong công nghiệp. Framework cho phép tạo ra các mô hình nhanh và gọn phù hợp với hệ thống online, với khả năng kết hợp các đặc trưng truyền thống để dự đoán chính xác hơn.
- Phát triển và triển khai vào production các mô hình học sâu mức ký tự có khả năng mở rộng cho dự đoán ý định truy vấn chưa hoàn chỉnh. Ngoài ra, chúng tôi đề xuất một mô hình đa ngôn ngữ tích hợp đặc trưng ngôn ngữ, vừa chính xác vừa dễ bảo trì hơn so với các mô hình riêng cho từng ngôn ngữ truyền thống.
- Phát triển và triển khai vào production một mô hình dựa trên BERT cho dự đoán ý định truy vấn hoàn chỉnh. Theo hiểu biết tốt nhất của chúng tôi, đây là mô hình BERT đầu tiên được báo cáo cho việc hiểu ý định truy vấn trong các công cụ tìm kiếm thực tế.
- Thực hiện các thí nghiệm offline toàn diện và A/B test online trên nhiều cấu trúc mạng neural khác nhau cho việc hiểu ý định truy vấn bằng học sâu, cũng như khảo sát chuyên sâu về độ mịn của token (mức từ, mức ký tự), các thành phần DNN (CNN, LSTM, BERT) và các mô hình đa ngôn ngữ, cùng với các bài học thực tiễn được tổng kết.

---

## 2. HIỂU Ý ĐỊNH TRUY VẤN TẠI LINKEDIN

Tìm kiếm của LinkedIn lưu trữ nhiều loại tài liệu khác nhau, ví dụ: hồ sơ người dùng (profile), tin tuyển dụng (job post), bài đăng trên bảng tin (feed), v.v. Khi người dùng đưa ra một truy vấn mà không chỉ rõ loại tài liệu họ quan tâm, việc xác định ý định là rất quan trọng để truy xuất tài liệu phù hợp và mang lại trải nghiệm người dùng chất lượng cao. Tại LinkedIn, chúng tôi định nghĩa **ý định truy vấn là loại tài liệu (document type)**.

Ý định truy vấn quan trọng đối với việc trộn kết quả (result blending) [12]: (1) Khi ý định không xuất hiện trong truy vấn, vertical search tương ứng có thể không được kích hoạt. (2) Với các tài liệu được truy xuất từ các vertical search đã được kích hoạt, một thuật toán blending sẽ xếp hạng các tài liệu dựa trên các ý định được phát hiện và các đặc trưng khác.

Trong phần này, chúng tôi trình bày hai sản phẩm production trong đó ý định truy vấn là một đặc trưng quan trọng cho thuật toán blending, tiếp theo là cách ý định truy vấn được sử dụng trong thuật toán blending.

> **Hình 1:** Ý định truy vấn trong công cụ tìm kiếm cho truy vấn chưa hoàn chỉnh (typeahead blending) và truy vấn hoàn chỉnh (SERP blending). *(Hình minh họa: các truy vấn "l", "li", "link" trong typeahead result blending, và truy vấn "linkedin" trong SERP result blending, Trang 1, Trang 2.)*

### 2.1 Ý định truy vấn trong Typeahead Blending

Khi người dùng bắt đầu gõ, ý định truy vấn được phát hiện và sử dụng trong typeahead blending. Tại LinkedIn, sản phẩm typeahead hiển thị trực tiếp các ảnh chụp nhanh tài liệu (document snapshot) từ nhiều vertical search, khác với query auto completion truyền thống vốn chỉ sinh ra các chuỗi truy vấn. Ba ảnh chụp bên trái trong Hình 1 cho thấy ví dụ về kết quả typeahead blending tại LinkedIn. Ví dụ giả định người dùng đang tìm công ty "LinkedIn". Kết quả trộn được hiển thị ngay khi người dùng gõ một chữ cái "l". Tiếp theo, với tiền tố truy vấn "li", dự đoán ý định có xu hướng nghiêng về loại kết quả người (people) và nhiều hồ sơ người dùng được xếp cao hơn kết quả công ty hoặc nhóm. Sau khi người dùng gõ "link" ở ảnh thứ ba, kết quả công ty LinkedIn được xếp đầu tiên.

Ý định truy vấn cho typeahead blending là thách thức vì các truy vấn thường chưa hoàn chỉnh và chỉ chứa vài chữ cái. Ngoài ra, với mỗi lần gõ phím, hệ thống cần truy xuất tài liệu từ các vertical search khác nhau và trộn kết quả. Điều này có nghĩa là các mô hình ý định truy vấn sẽ được gọi rất thường xuyên, và mỗi lần chạy phải hoàn thành trong thời gian ngắn.

### 2.2 Ý định truy vấn trong SERP Blending

SERP blending là một thành phần phổ biến hơn typeahead blending trong các công cụ tìm kiếm. Khi người dùng gõ xong và nhấn "search", một truy vấn hoàn chỉnh được gửi đi; ý định truy vấn được xác định và dùng để trộn các tài liệu được truy xuất. Khối ngoài cùng bên phải trong Hình 1 cho thấy kết quả SERP blending cho truy vấn hoàn chỉnh "linkedin", bao gồm trang công ty, hồ sơ người dùng, tin tuyển dụng, v.v.

So với typeahead blending, ý định truy vấn trong SERP blending có khoảng đệm latency lớn hơn. Truy vấn chứa các từ hoàn chỉnh, tuy nhiên vẫn gặp hạn chế về ngữ cảnh: chỉ có vài từ trong một truy vấn để dự đoán ý định.

### 2.3 Hệ thống trộn tài liệu được truy xuất (Retrieved Document Blending Systems)

Cả hệ thống typeahead blending và SERP blending đều theo thiết kế tương tự. Nhiều đặc trưng được tạo ra để trộn/xếp hạng các tài liệu được truy xuất: (1) Xác suất trên mỗi ý định dựa trên văn bản truy vấn và hành vi người dùng (đầu ra của mô hình ý định truy vấn); (2) các đặc trưng khớp giữa truy vấn và tài liệu được truy xuất; (3) các đặc trưng cá nhân hóa và theo ngữ cảnh.

Trong phần còn lại của bài báo, chúng tôi tập trung vào cách tạo ra xác suất ý định truy vấn cho typeahead blending và SERP blending.

---

## 3. ĐỊNH NGHĨA BÀI TOÁN

Cả ý định truy vấn chưa hoàn chỉnh và hoàn chỉnh về bản chất đều là các bài toán phân loại. Không mất tính tổng quát, với một người dùng có id *u ∈ U* và một chuỗi truy vấn *q ∈ Q*, mục tiêu là học một hàm *γ* để dự đoán ý định định trước *i* trong một số hữu hạn các lớp ý định *I = {i₁, i₂, ..., iₙ}*:

**γ : ⟨Q, U⟩ → I**

Với hai tác vụ (ý định truy vấn chưa hoàn chỉnh/hoàn chỉnh), tập các lớp ý định hơi khác nhau do thiết kế sản phẩm. Như sẽ trình bày ở phần sau, các mô hình học sâu được áp dụng lên chuỗi truy vấn; id người dùng được dùng để tạo các đặc trưng cá nhân hóa.

---

## 4. HIỂU Ý ĐỊNH TRUY VẤN BẰNG HỌC SÂU

Trong phần này, chúng tôi giới thiệu framework mô hình hóa ý định đề xuất, cũng như thiết kế chi tiết của hai ứng dụng: mô hình ý định truy vấn chưa hoàn chỉnh và mô hình ý định truy vấn hoàn chỉnh.

### 4.1 Yêu cầu sản phẩm

Như thể hiện ở Hình 1, có hai sản phẩm trộn kết quả dựa vào ý định truy vấn: typeahead blending và SERP blending. Hai sản phẩm này đặt ra một số yêu cầu đối với các mô hình ý định truy vấn.

Typeahead blending có tiêu chuẩn latency rất nghiêm ngặt: với mỗi lần gõ phím, mô hình cần trả về kết quả. Đồng thời, nó không đòi hỏi độ chính xác quá cao vì dự đoán sẽ chính xác hơn khi nhận thêm ký tự. Ngược lại, SERP blending có nhiều khoảng đệm latency hơn, và đòi hỏi độ chính xác cao của ý định truy vấn, nếu không người dùng có thể bỏ tìm kiếm.

### 4.2 Framework mô hình hóa ý định

Xuất phát từ các yêu cầu sản phẩm, chúng tôi thiết kế một framework cho việc hiểu ý định truy vấn. Kiến trúc tổng thể được thể hiện ở Hình 2.

> **Hình 2:** Framework hiểu ý định truy vấn bằng học sâu. *(Các khối từ dưới lên: Query Text → Input Representation → Deep Modules (CNN/LSTM/BERT) → Query Embeddings; kết hợp với Traditional Features → Dense Layer → Output Layer.)*

#### 4.2.1 Biểu diễn đầu vào (Input Representation)

Đầu vào của mô hình được biểu diễn dưới dạng một chuỗi các embedding. Có hai lựa chọn về độ mịn: embedding mức ký tự và mức từ, tương ứng để hỗ trợ truy vấn chưa hoàn chỉnh và hoàn chỉnh.

#### 4.2.2 Các module sâu (Deep Modules)

Trong framework này, một số phương pháp mã hóa văn bản phổ biến được cung cấp để tạo query embedding. Điều này mang lại sự linh hoạt tốt để thích ứng framework với nhiều kịch bản sản phẩm dưới các ràng buộc latency/độ chính xác khác nhau.

**CNN** mạnh ở việc trích xuất các đặc trưng n-gram cục bộ trong một chuỗi [15, 17]. Đầu vào của CNN là một chuỗi các token embedding, tức là ma trận embedding. Các lớp tích chập 1 chiều có thể gồm nhiều filter với chiều cao khác nhau. Chiều rộng của filter CNN luôn bằng kích thước embedding, trong khi chiều cao của filter có thể thay đổi, biểu diễn các n-gram từ hoặc ký tự mà filter bao phủ. Max-pooling theo thời gian được thực hiện sau mỗi lớp tích chập.

So với CNN, **LSTM** [11] nắm bắt tốt hơn các phụ thuộc xa, đặc biệt với chuỗi ký tự. LSTM hai chiều (Bi-directional LSTM) [29] được dùng để mô hình hóa thông tin chuỗi theo cả chiều xuôi và chiều ngược. Trạng thái ẩn cuối cùng của hai lớp được nối lại với nhau để tạo thành lớp đầu ra.

**BERT** [9] dùng self-attention [26] để tích hợp tường minh nghĩa ngữ cảnh của từ vào từ đích, do đó tốt hơn trong việc phân biệt nghĩa của từ. Đồng thời, việc pretraining cho phép tận dụng lượng lớn dữ liệu không giám sát. Với một truy vấn, BERT nhận một chuỗi token làm đầu vào và xuất ra biểu diễn theo ngữ cảnh của chuỗi. Một token đặc biệt [CLS] ở đầu mỗi chuỗi mô hình hóa biểu diễn của toàn bộ chuỗi và được dùng cho các tác vụ phân loại.

#### 4.2.3 Đặc trưng truyền thống (Traditional Features)

Đặc trưng truyền thống là các đặc trưng được thiết kế thủ công, mạnh trong việc nắm bắt thông tin ngữ cảnh bổ sung cho các đặc trưng văn bản sâu. Có nhiều loại đặc trưng truyền thống có thể được xem xét trong production, chẳng hạn đặc trưng ngôn ngữ, đặc trưng profile/hành vi người dùng. Các đặc trưng này đặc biệt quan trọng để bù đắp ngữ cảnh hạn chế của các truy vấn ngắn. Theo kiểu wide-and-deep [7], các đặc trưng truyền thống được nối (concatenate) với query embedding, sau đó đưa vào một lớp dense để có được các tương tác phi tuyến giữa các đặc trưng.
x
### 4.3 Mô hình hóa ý định truy vấn chưa hoàn chỉnh

Trong typeahead search, người dùng thường gõ một tiền tố truy vấn và chọn kết quả từ thanh thả xuống. Trong trường hợp này, một lượng lớn các từ chưa hoàn chỉnh được sinh ra, và chúng bị nhận diện là từ ngoài từ vựng (out-of-vocabulary). Điều này thúc đẩy chúng tôi thiết kế bộ phân loại ý định truy vấn chưa hoàn chỉnh với biểu diễn mức ký tự. Các mô hình mức ký tự còn có các lợi ích bổ sung: (1) vững chắc hơn với lỗi chính tả, so với các mô hình mức từ nơi các từ sai chính tả sẽ thành out-of-vocabulary; (2) mô hình thu được nhỏ gọn (1.4 Megabyte với 500 ký tự), vì kích thước từ vựng ký tự nhỏ.

Nhờ khả năng nắm bắt thông tin phụ thuộc xa, LSTM phù hợp nhất với bài toán này, vì chuỗi có thể dài hơn 10 ký tự. Ngược lại, CNN nắm bắt các mẫu chữ cái n-gram (ví dụ: tri-letter). Tuy nhiên, nó không theo dõi ngữ cảnh của các tri-letter, cũng như vị trí của chúng. BERT không được áp dụng cho tác vụ này vì sản phẩm typeahead có ràng buộc latency chặt. Latency sẽ không đáp ứng ràng buộc production vì BERT quá nặng về tính toán.

#### 4.3.1 Hỗ trợ đa ngôn ngữ (Multilingual Support)

Các hệ thống tìm kiếm thường có lượng traffic lớn ở nhiều quốc gia với các ngôn ngữ khác nhau. Trong typeahead search của LinkedIn, hơn 30% traffic tìm kiếm đến từ các ngôn ngữ ngoài tiếng Anh. Xử lý khoảng cách hiệu năng giữa tiếng Anh và các ngôn ngữ khác là rất quan trọng để có trải nghiệm người dùng tốt trong typeahead.

Cách thông thường để xử lý đa ngôn ngữ là huấn luyện mô hình riêng cho từng ngôn ngữ, việc này khó bảo trì và mở rộng. Cách tiếp cận mức ký tự có thể dễ dàng mở rộng để hỗ trợ nhiều ngôn ngữ bằng một mô hình thống nhất, vì từ vựng ký tự của tất cả ngôn ngữ nhỏ hơn nhiều so với từ vựng mức từ.

Để huấn luyện một mô hình đa ngôn ngữ thống nhất, hai cách tiếp cận được thiết kế để mô hình hóa thông tin ngôn ngữ/locale:

**Language Feature Embedding (Nhúng đặc trưng ngôn ngữ):** Cách thứ nhất là nối embedding của locale giao diện vào embedding của truy vấn đầu vào, rồi đưa qua BiLSTM để tạo ra các đặc trưng truy vấn được "nhúng" locale giao diện, như thể hiện ở Hình 3a. Các embedding của locale giao diện được khởi tạo ngẫu nhiên và được huấn luyện cùng với mạng.

**Language Feature Concatenation (Nối đặc trưng ngôn ngữ):** Cách thứ hai là dùng lớp BiLSTM để trích xuất đặc trưng truy vấn từ các query embedding, rồi nối embedding của locale giao diện vào trạng thái đầu ra cuối cùng của BiLSTM, như ở Hình 3b. So với cách thứ nhất, BiLSTM không nhận biết ngôn ngữ.

### 4.4 Mô hình hóa ý định truy vấn hoàn chỉnh

Chúng tôi thiết kế các mô hình CNN, LSTM và BERT mức từ cho phân loại ý định truy vấn hoàn chỉnh. CNN giỏi nắm bắt các mẫu n-gram của từ. LSTM mạnh trong việc mô hình hóa ngữ cảnh chuỗi dài. BERT làm giàu thêm biểu diễn truy vấn bằng cách mô hình hóa nghĩa theo ngữ cảnh. Cụ thể, một mô hình BERT được pretrain bằng dữ liệu LinkedIn (LiBERT) được sử dụng.

Có hai động cơ chính để pretrain một mô hình BERT bằng dữ liệu LinkedIn trong miền (LiBERT) thay vì dùng các mô hình BERT có sẵn do Google phát hành [9]:

**Ràng buộc latency.** Xác suất của các ý định khác nhau cho một truy vấn cần được tính ngay tại thời điểm chạy (on-the-fly) thay vì tính trước, vì mỗi ngày có những truy vấn duy nhất từ các người dùng khác nhau. Do GPU/TPU serving chưa khả dụng tại LinkedIn, latency để tính đầu ra ý định truy vấn bằng mô hình BERT-Base của Google sẽ không đáp ứng yêu cầu latency quan trọng. Mô hình LiBERT có kiến trúc nhẹ hơn (được thảo luận ở Mục 5.3.2) so với mô hình nhỏ nhất được phát hành trong bài báo gốc [9].

**Hiệu năng relevance tốt hơn.** Ngoài lợi ích về latency thấp, việc pretrain mô hình BERT từ đầu bằng dữ liệu LinkedIn tận dụng kiến thức trong miền có trong kho dữ liệu, do đó có thể mang lại hiệu năng relevance tốt hơn cho các tác vụ fine-tuning phía sau. Một ví dụ là LinkedIn và Pinterest đều là từ ngoài từ vựng (out-of-vocabulary) trong mô hình BERT-Base của Google. Những tên công ty này nhìn chung quan trọng đối với tìm kiếm của LinkedIn.

Lưu ý rằng chúng tôi chưa khảo sát cách tiếp cận đa ngôn ngữ cho các mô hình ý định truy vấn hoàn chỉnh mức từ. Lý do là từ vựng mức từ có thể khá lớn nếu bao gồm các ngôn ngữ chính, do đó làm tăng độ phức tạp cho mô hình.

---

## 5. THÍ NGHIỆM

Phần này thảo luận các thí nghiệm trên cả mô hình dự đoán ý định truy vấn chưa hoàn chỉnh và hoàn chỉnh. So sánh hiệu năng ở cả chỉ số offline và online được thể hiện bằng chênh lệch tương đối thay vì giá trị tuyệt đối do chính sách công ty. Chúng tôi cũng chia sẻ phân tích về khả năng mở rộng (scalability) của các mô hình dựa trên học sâu này, cũng như hiệu năng A/B test online của chúng so với các baseline production. Tensorflow serving trên CPU được dùng cho suy luận online của các mô hình sâu. Các đặc trưng truyền thống như đặc trưng hành vi người dùng được đẩy vào một online store sau khi tính toán offline hằng ngày và có thể truy cập trong lúc suy luận mô hình. Tất cả mức tăng (lift) của các chỉ số online được báo cáo đều có ý nghĩa thống kê (p < 0.05) và được thu thập dựa trên 4 tuần A/B test với 50% traffic tìm kiếm. Mô hình LSTM và mô hình BERT được đưa hoàn toàn vào production sau A/B test, lần lượt cho ý định truy vấn chưa hoàn chỉnh và hoàn chỉnh.

### 5.1 Thu thập dữ liệu huấn luyện

Log click-through của tìm kiếm được dùng để thu thập dữ liệu huấn luyện. Ví dụ, nếu một người dùng tìm kiếm *linkedin sales solutions* và click vào một tin tuyển dụng thay vì trang người hoặc nội dung, nhãn ý định *job* được gán cho truy vấn này. Tương tự, khi người dùng gõ truy vấn chưa hoàn chỉnh *face* và chọn trang công ty facebook, thì ý định *company* được suy ra.

Với cả mô hình ý định chưa hoàn chỉnh và hoàn chỉnh, chúng tôi thu thập dữ liệu huấn luyện lấy mẫu từ log click-through trong một tháng. Với các tập train/dev/test, chúng tôi lấy mẫu 42M/21K/21K cho các mô hình chưa hoàn chỉnh tiếng Anh, 63M/36K/36K cho các mô hình truy vấn chưa hoàn chỉnh đa ngôn ngữ, và 24M/50K/50K cho các mô hình ý định truy vấn hoàn chỉnh.

### 5.2 Dự đoán ý định truy vấn chưa hoàn chỉnh

#### 5.2.1 Thiết lập thí nghiệm

Chúng tôi đánh giá hiệu năng của các mô hình CNN và LSTM dựa trên ký tự trong các thí nghiệm offline. Mô hình baseline được học bằng đặc trưng bag-of-words letter tri-gram với bộ phân loại logistic regression.

Trong các mô hình dựa trên CNN/LSTM, embedding ký tự có kích thước 128, với kích thước từ vựng 500. Các ký tự trong từ vựng được trích xuất từ những ký tự xuất hiện thường xuyên nhất trong dữ liệu huấn luyện. Các embedding được khởi tạo ngẫu nhiên khi bắt đầu huấn luyện. Chúng tôi dùng 128 filter tích chập kích thước 3 để huấn luyện mô hình CNN. Trong mô hình LSTM hai chiều, cùng từ vựng ký tự như mô hình CNN được sử dụng và số đơn vị ẩn (hidden units) là 128.

#### 5.2.2 Thí nghiệm offline

Cả mô hình chưa hoàn chỉnh tiếng Anh và đa ngôn ngữ đều được khảo sát trong các thí nghiệm offline. Xuyên suốt phần so sánh kết quả, chúng tôi dùng ký hiệu *−en* và *−i18n* để chỉ mô hình tiếng Anh và mô hình đa ngôn ngữ.

**Mô hình tiếng Anh.** Bộ thí nghiệm đầu tiên được thực hiện trên các truy vấn chưa hoàn chỉnh tiếng Anh. Kết quả thực nghiệm cho thấy so với mô hình tri-letter, mô hình dựa trên CNN (CNN-en) đạt độ chính xác cao hơn, chủ yếu vì CNN có thể trích xuất các đặc trưng mẫu từ trừu tượng hơn so với các đặc trưng bag-of-words truyền thống. Như thể hiện ở Bảng 1, mô hình LSTM hai chiều LSTM-en cải thiện hiệu năng thêm (+7.11% so với +4.14%), vì LSTM mô hình hóa tốt hơn các chuỗi ký tự dài.

**Bảng 1:** So sánh hiệu năng offline của các mô hình mức ký tự khác nhau so với baseline production.

| Mô hình | Accuracy | F1 (people) | F1 (company) |
|---|---|---|---|
| Tri-letter | - | - | - |
| CNN-en | +4.14% | +2.69% | +11.39% |
| LSTM-en | +7.11% | +4.46% | +20.36% |

Chúng tôi cũng so sánh tác động của kích thước từ vựng ký tự đối với các mô hình sâu (Bảng 2). Thật thú vị khi thấy rằng ngay cả với từ vựng nhỏ (chỉ 70 ký tự gồm chữ cái tiếng Anh viết thường và các ký tự đặc biệt), độ chính xác vẫn cao hơn đáng kể so với mô hình baseline.

**Bảng 2:** Kích thước từ vựng ký tự cho các mô hình ý định truy vấn chưa hoàn chỉnh.

| Mô hình | Vocab | Accuracy | F1 (people) | F1 (company) |
|---|---|---|---|---|
| Tri-letter | - | - | - | - |
| CNN-en | 70 | +4.09% | +2.69% | +11.38% |
| CNN-en | 500 | +4.14% | +2.73% | +11.75% |
| LSTM-en | 70 | +7.04% | +4.46% | +20.36% |
| LSTM-en | 500 | +7.11% | +4.49% | +20.49% |

**Mô hình đa ngôn ngữ.** Trong các thí nghiệm đa ngôn ngữ, trước tiên chúng tôi thu thập dữ liệu huấn luyện theo quy trình tương tự trên 30 locale quốc tế hàng đầu, như tiếng Pháp, Bồ Đào Nha, Đức, v.v. Các locale quốc tế được dùng làm đặc trưng ngôn ngữ trong mô hình đa ngôn ngữ của chúng tôi. 10 nghìn ký tự thường xuyên nhất được trích xuất làm từ vựng.

**Bảng 3:** Các mô hình đa ngôn ngữ cho ý định truy vấn chưa hoàn chỉnh mức ký tự.

| Mô hình | Accuracy | F1 (people) | F1 (company) |
|---|---|---|---|
| LSTM-i18n | - | - | - |
| LSTM-i18n-embed | +0.67% | +0.44% | +1.34% |
| LSTM-i18n-concat | +0.55% | +0.37% | +1.12% |

Bảng 3 tóm tắt hiệu năng của hai chiến lược khác nhau đã thảo luận ở Mục 4.3.1. Kết quả cho thấy cả hai phương pháp đều vượt trội so với baseline không được tiêm embedding ngôn ngữ. Phương pháp language feature embedding (LSTM-i18n-embed) nhỉnh hơn một chút so với phương pháp concatenation (LSTM-i18n-concat). Có thể là do trong LSTM-i18n-concat, LSTM nhận biết ngôn ngữ, do đó tạo ra một biểu diễn có ý nghĩa hơn cho chuỗi ký tự đầu vào. *(Ghi chú của người dịch: câu này dịch sát bản gốc, nhưng nó mâu thuẫn với Mục 4.3.1, nơi nói rằng trong phương pháp concatenation thì BiLSTM không nhận biết ngôn ngữ, còn ở phương pháp embedding thì có. Nhiều khả năng đây là lỗi trong bản gốc, và ý đúng là LSTM ở phương pháp embed mới là bên nhận biết ngôn ngữ.)*

Chúng tôi tiếp tục so sánh hiệu quả của các mô hình đa ngôn ngữ với các mô hình theo từng ngôn ngữ truyền thống. Bảng 4 cho thấy độ chính xác tổng thể và độ chính xác theo từng ngôn ngữ. LSTM-per-lang được huấn luyện và đánh giá trên từng phần ngôn ngữ riêng lẻ. LSTM-i18n là mô hình đa ngôn ngữ không thêm đặc trưng ngôn ngữ. LSTM-i18n-embed là mô hình có thêm đặc trưng ngôn ngữ vào embedding ký tự. Độ chính xác tổng thể của LSTM-i18n-embed tương đương mô hình theo từng ngôn ngữ. Chúng tôi cũng lấy mẫu 4 ngôn ngữ để cho thấy hiệu năng riêng lẻ. Với tiếng Pháp (fr) và tiếng Trung (zh), cả hai mô hình đa ngôn ngữ đều cải thiện hiệu năng so với mô hình LSTM-i18n-per-lang đơn ngôn ngữ chỉ được huấn luyện trên dữ liệu của một ngôn ngữ. Điều này cho thấy với một số ngôn ngữ, đa ngôn ngữ giúp mô hình học từ các ngôn ngữ khác và tổng quát hóa tốt hơn để hỗ trợ dự đoán cho ngôn ngữ cụ thể. Ở hai ngôn ngữ còn lại, cả LSTM-i18n và LSTM-i18n-embed đều không vượt trội hơn các mô hình theo từng ngôn ngữ. Điều này thường là dự kiến. Nhưng với đặc trưng ngôn ngữ được nhúng (LSTM-i18n-embed), chúng tôi quan sát thấy độ chính xác tăng so với mô hình LSTM-i18n.

**Bảng 4:** Mô hình đa ngôn ngữ so với các mô hình theo từng ngôn ngữ.

| Mô hình | Overall | fr | de | zh | da |
|---|---|---|---|---|---|
| LSTM-i18n-per-lang | - | - | - | - | - |
| LSTM-i18n | −0.65% | +0.28% | −0.84% | +0.54% | −1.24% |
| LSTM-i18n-embed | +0.02% | +0.56% | +1.01% | −1.11% | −0.66% |

> **Hình 3:** Sơ đồ nhúng (embedding) và nối (concatenation) đặc trưng ngôn ngữ cho mô hình ý định truy vấn mức ký tự đa ngôn ngữ. *(a) Embedding: locale embedding [En] được nối vào từng character embedding trước khi vào Forward LSTM/Backward LSTM, rồi qua Dense Layer và Softmax. (b) Concatenation: locale embedding [En] được nối sau đầu ra của Forward/Backward LSTM, rồi qua Dense Layer và Softmax. Ví dụ đầu vào là các ký tự "L i n".)*

#### 5.2.3 Thí nghiệm online

Như thể hiện ở Bảng 5, mô hình tiếng Anh (LSTM-en) và mô hình đa ngôn ngữ (LSTM-i18n-embed) được thử nghiệm trong typeahead search production, lần lượt với traffic tiếng Anh/không phải tiếng Anh. Các chỉ số kinh doanh online đo lường tiêu chí thành công trong các phiên tìm kiếm. Cả hai mô hình đều cho thấy mức tăng hiệu năng đáng kể về search session success. Một quan sát thú vị là thời gian trung bình để đạt thành công (time to success) trên mobile giảm ở cả hai mô hình. Một lý do trực quan là người dùng mobile có nhiều khả năng click vào các kết quả chất lượng cao được hiển thị trong typeahead search hơn so với desktop, do đặc thù cách gõ phím.

**Bảng 5:** So sánh hiệu năng online của các mô hình ý định truy vấn chưa hoàn chỉnh so với baseline tuyến tính.

| Mô hình | Traffic | Chỉ số | Lift |
|---|---|---|---|
| LSTM-en | Tiếng Anh | Search session success | +0.43% |
| | | Time to success (mobile) | −0.15% |
| LSTM-i18n-embed | Ngoài tiếng Anh | Search session success | +0.86% |
| | | Time to success (mobile) | −0.19% |

### 5.3 Dự đoán ý định truy vấn hoàn chỉnh

#### 5.3.1 Thiết lập thí nghiệm

Đầu vào là embedding mức từ. Các embedding được khởi tạo bằng biểu diễn vector từ GloVe [22] được pretrain trên dữ liệu văn bản của LinkedIn. Nó bao phủ từ vựng 100K với số chiều 64.

Mô hình baseline production là mô hình logistic regression, với các đặc trưng bag-of-words và các đặc trưng profile/hành vi người dùng, v.v. Trong các thí nghiệm offline, trước tiên chúng tôi so sánh hiệu năng giữa các mô hình học sâu với baseline production. Với mô hình dựa trên CNN, chúng tôi dùng 128 filter có chiều cao 3 (tri-gram) cho tích chập 1 chiều. Kích thước trạng thái ẩn là 128 cho mô hình dựa trên LSTM. Với cả CNN và LSTM, sau khi query embedding được tạo ra, một lớp kích thước 200 được dùng để nắm bắt các tương tác phi tuyến giữa biểu diễn truy vấn và các đặc trưng truyền thống.

#### 5.3.2 Pretraining LiBERT

Mô hình dựa trên LiBERT được fine-tune từ một mô hình BERT được pretrain trên dữ liệu LinkedIn. Dữ liệu pretraining bao gồm nhiều nguồn dữ liệu đa dạng trên LinkedIn: truy vấn tìm kiếm, hồ sơ người dùng, tin tuyển dụng, v.v. Dữ liệu thu thập cho pretraining gồm khoảng 1 tỷ từ. Một cấu trúc nhẹ được sử dụng so với BERT-Base (một mô hình nhỏ hơn được công bố trong BERT [9]). So sánh giữa BERT-Base và LiBERT được nêu ở Bảng 6.

**Bảng 6:** So sánh kiến trúc mô hình giữa LiBERT và BERT-Base của Google.

| Siêu tham số BERT | BERT-Base | LiBERT |
|---|---|---|
| Layers | 12 | 3 |
| Hidden size | 768 | 256 |
| Attention heads | 12 | 8 |
| Tổng số tham số | 110M | 10M |

#### 5.3.3 Thí nghiệm offline

Bảng 7 tóm tắt hiệu năng của các mô hình khác nhau. CNN/LSTM vượt trội các mô hình baseline lần lượt +6.40%/+6.69%.

**Bảng 7:** So sánh hiệu năng offline của các mô hình mức từ so với baseline production.

| Mô hình | Accuracy | F1 (people) | F1 (job) |
|---|---|---|---|
| LR-BOW | - | - | - |
| CNN-word | +6.40% | +1.36% | +17.35% |
| CNN-char | +3.49% | −0.50% | +10.29% |
| LSTM-word | +6.69% | +1.47% | +17.99% |
| LSTM-char | +4.63% | +0.23% | +13.46% |
| BERT-Base | +8.20% | +2.33% | +19.33% |
| LiBERT | +8.35% | +2.46% | +20.60% |

Chúng tôi tiếp tục so sánh hiệu năng của các mô hình truy vấn hoàn chỉnh ở các độ mịn token và loại mô hình sâu khác nhau. Thứ nhất, các mô hình mức từ vượt trội các mô hình mức ký tự một cách nhất quán. Điều này hàm ý rằng với truy vấn hoàn chỉnh, biểu diễn mức từ nắm bắt được các đặc trưng có ý nghĩa hơn so với chuỗi ký tự. Tiếp theo, chúng tôi so sánh hiệu năng của các mô hình LSTM và CNN ở các độ mịn token khác nhau. Cụ thể, với các mô hình mức từ, LSTM và CNN có hiệu năng tương tự nhau. Điều này hàm ý rằng thông tin tuần tự hữu ích trong các chuỗi từ là hạn chế do độ dài ngắn của truy vấn và có thể do hiệu quả của thông tin mức từ như nghĩa của từ. Điều này được chứng minh thêm khi so sánh các mô hình mức ký tự, LSTM vượt trội CNN với biên độ lớn hơn, nghĩa là thông tin phạm vi xa hữu ích hơn trong mô hình hóa chuỗi ký tự. Quan sát tương tự có thể thấy ở Bảng 1 trong các thí nghiệm mô hình ý định truy vấn chưa hoàn chỉnh, nơi chúng tôi thấy mức cải thiện của LSTM so với CNN còn rõ rệt hơn, hàm ý rằng LSTM phù hợp hơn trong việc mô hình hóa các chuỗi ký tự chưa hoàn chỉnh trong typeahead so với các truy vấn hoàn chỉnh trong SERP.

Các mô hình BERT (BERT-Base và LiBERT) có thể cải thiện thêm độ chính xác so với các mô hình CNN/LSTM. Điều này có thể được quy cho các contextual embedding, vốn phân biệt nghĩa của từ trong các ngữ cảnh khác nhau tốt hơn.

Ngoài ra, chúng tôi muốn phân tích ảnh hưởng của các đặc trưng truyền thống lên các mô hình sâu. Như thể hiện ở Bảng 8, khi không có các đặc trưng truyền thống, các mô hình sâu (CNN, LSTM và LiBERT) mang lại mức tăng hiệu năng ít hơn nhiều so với khi kết hợp các đặc trưng này theo kiểu wide-and-deep.

#### 5.3.4 Thí nghiệm online

Đáng lưu ý là dù mô hình LSTM hoạt động tốt hơn mô hình CNN một chút, chúng tôi vẫn tiến hành triển khai mô hình CNN vào production online. Lý do là LSTM không mang lại nhiều lợi ích relevance trong khi làm tăng latency suy luận gần gấp 2 lần (Bảng 10).

**Bảng 8:** So sánh hiệu năng khi có và không kết hợp đặc trưng truyền thống.

| Mô hình | Trad Features | Accuracy | F1 (people) | F1 (job) |
|---|---|---|---|---|
| LR-BOW | - | - | - | - |
| CNN | False | +1.27% | −1.56% | +5.27% |
| CNN | True | +6.40% | +1.36% | +17.35% |
| LSTM | False | +1.26% | −1.54% | +5.15% |
| LSTM | True | +6.69% | +1.47% | +17.99% |
| LiBERT | False | +1.90% | −1.14% | −6.16% |
| LiBERT | True | +8.35% | +2.46% | +20.60% |

**Bảng 9:** So sánh hiệu năng online của mô hình ý định truy vấn hoàn chỉnh mức từ so với baseline production trong SERP blending.

| Mô hình | Chỉ số | % lift |
|---|---|---|
| CNN-word | CTR@5 | neutral (không đổi) |
| | CTR@5 cho kết quả job | +0.43% |
| | SAT click | neutral (không đổi) |
| LiBERT (so với CNN-word) | CTR@5 | +0.17% |
| | CTR@5 cho kết quả job | +0.51% |
| | SAT click | +1.36% |

Bảng 9 cho thấy mức tăng các chỉ số online của mô hình CNN so với logistic regression. Nó cải thiện hai chỉ số liên quan đến tìm kiếm việc làm: tỷ lệ click-through tổng thể của các tin tuyển dụng ở vị trí 1 đến 5 trên trang kết quả tìm kiếm (CTR@5, tức CTR ở vị trí 1 đến 5 cho kết quả Job), và tổng số người xem kết quả tìm kiếm việc làm (Job Viewers). Điều này nhất quán với điểm F1 của ý định job được cải thiện đáng kể (kết quả offline ở Bảng 7).

Sau đó, chúng tôi tiến hành các thí nghiệm online của LiBERT so với CNN (Bảng 9). Vì LiBERT có thể cải thiện thêm độ chính xác của tất cả các ý định, nhiều chỉ số online hơn đạt ý nghĩa, bao gồm SAT click (các click thỏa mãn trên tài liệu có thời gian lưu lại dài) và CTR@5 trên tất cả các tài liệu.

### 5.4 Khả năng mở rộng (Scalability)

Trong hệ thống online, latency ở phân vị 99 (P99) là thách thức chính khi đưa vào production. Với ý định truy vấn, việc tính trước offline các truy vấn thường gặp không giúp ích, vì các truy vấn ở P99 thường hiếm, và mỗi ngày có một số lượng lớn truy vấn chưa từng thấy trong tìm kiếm LinkedIn. So sánh latency của các mô hình mức ký tự (CNN-char và LSTM-char) cho truy vấn chưa hoàn chỉnh được thể hiện ở Bảng 10. Các con số latency P99 được tính trên máy Intel(R) Xeon(R) 8-core CPU E5-2620 v4 @ 2.10GHz với bộ nhớ 64GB.

Với truy vấn hoàn chỉnh, các mô hình CNN/LSTM có latency còn thấp hơn, vì số từ nhìn chung nhỏ hơn số ký tự. Với các mô hình BERT, latency tăng đáng kể. Đáng lưu ý là bằng cách pretrain một mô hình BERT nhỏ hơn trên dữ liệu trong miền, chúng tôi giảm được latency từ 53ms (BERT-Base) xuống 15ms (LiBERT) mà không làm giảm hiệu năng relevance, đáp ứng yêu cầu latency của search blending.

**Bảng 10:** So sánh latency và kích thước mô hình của các mô hình ý định truy vấn khác nhau ở phân vị 99.

| Loại | Mô hình | #Params | Latency P99 |
|---|---|---|---|
| Ý định truy vấn chưa hoàn chỉnh | Tri-letter | - | - |
| | CNN-en | 123k | +0.38ms |
| | LSTM-en | 379k | +2.49ms |
| | LSTM-i18n-embed | 1M | +2.72ms |
| Ý định truy vấn hoàn chỉnh | LR-BOW | - | - |
| | CNN-word | 6.5M | +0.45ms |
| | LSTM-word | 6.5M | +0.96ms |
| | BERT-Base [9] | 110M | +53.2ms |
| | LiBERT | 10M | +15.0ms |

---

## 6. CÁC BÀI HỌC KINH NGHIỆM

Chúng tôi muốn chia sẻ những kinh nghiệm và bài học rút ra trong hành trình tận dụng các công nghệ tiên tiến nhất và triển khai các mô hình sâu cho dự đoán ý định truy vấn vào các hệ thống production online. Chúng tôi hy vọng chúng có thể giúp ích cho những người trong ngành đang đối mặt với các tác vụ tương tự.

**Đánh đổi giữa hiệu quả/hiệu suất online (Online Effectiveness/Efficiency Trade-off).** Các thí nghiệm của chúng tôi với các mô hình dựa trên BERT cho thấy việc pretrain bằng dữ liệu trong miền cải thiện đáng kể hiệu năng fine-tuning so với các mô hình có sẵn. Ngoài các lợi ích về relevance mà BERT mang lại, latency là vấn đề lớn khi đưa các mô hình lớn này vào production. Chúng tôi nhận thấy rằng việc giảm kích thước mô hình pretrain làm giảm đáng kể latency suy luận trong khi vẫn cho dự đoán chính xác.

Với ý định truy vấn chưa hoàn chỉnh, chúng tôi không thể triển khai các mô hình phức tạp do ràng buộc latency trong typeahead search. Để tối đa hóa hiệu năng relevance trong ràng buộc latency chặt, chúng tôi khảo sát các đặc tính của mô hình LSTM và CNN về hiệu quả và hiệu suất. LSTM cho hiệu năng relevance vượt trội nhờ khả năng nắm bắt thông tin phạm vi xa trong chuỗi, đặc biệt khi chuỗi chưa hoàn chỉnh, trong khi CNN nhanh hơn nhiều về tốc độ suy luận theo thiết kế. Chúng tôi đã có thể triển khai các mô hình LSTM gọn vào sản phẩm typeahead trong khi đạt hiệu năng dự đoán tối ưu với latency suy luận ở mức chấp nhận được trong production.

**Độ mịn của token (Token Granularity).** Trong các mô hình ý định truy vấn chưa hoàn chỉnh cho sản phẩm typeahead search, việc chọn mô hình mức ký tự là hiệu quả trong việc mô hình hóa các chuỗi ký tự của truy vấn chưa hoàn chỉnh. Đáng nói là các mô hình này cần kích thước từ vựng nhỏ hơn so với mức từ hoặc mức subword, dẫn đến các mô hình gọn hơn nhiều, phù hợp cho phục vụ online. Độ mịn mức ký tự cho phép kết hợp từ vựng của các ngôn ngữ khác nhau vì nhiều ngôn ngữ dùng các ký tự tương tự. Thiết kế các mô hình đa ngôn ngữ còn có thể mang lại lợi ích cho các hệ thống online với dự đoán vững chắc trên nhiều thị trường, trong khi dễ bảo trì hơn so với các mô hình theo từng ngôn ngữ.

**Kết hợp đặc trưng truyền thống (Combining Traditional Features).** Các đặc trưng truyền thống mang nhiều thông tin, giúp thúc đẩy việc hiểu ý định truy vấn bằng học sâu. Từ các thí nghiệm, chúng tôi cho thấy việc đơn giản loại bỏ các đặc trưng thủ công và đặc trưng cá nhân hóa của người dùng rồi thay bằng các mô hình học sâu sẽ làm hại hiệu năng relevance. Chúng tôi nhận thấy việc kết hợp các đặc trưng truyền thống theo kiểu wide-and-deep là then chốt cho dự đoán ý định thành công.

---

## 7. CÁC CÔNG TRÌNH LIÊN QUAN

Dự đoán ý định truy vấn từ lâu là một chủ đề quan trọng trong các công cụ tìm kiếm hiện đại [12, 16, 20, 25]. Trước tiên chúng tôi giới thiệu các phương pháp truyền thống, sau đó trình bày cách các mô hình học sâu được áp dụng vào bài toán này. Cuối cùng, chúng tôi thảo luận các công trình hiện có về mô hình hóa ý định truy vấn chưa hoàn chỉnh.

### 7.1 Các phương pháp truyền thống

Các công trình ý định truy vấn ban đầu dùng phương pháp dựa trên luật [13, 24], như một chiến lược độ chính xác (precision) cao nhưng độ phủ (recall) thấp. Tuy nhiên, chúng khó bảo trì khi các luật trở nên phức tạp hơn, và recall thấp.

Gần đây hơn, các mô hình thống kê cho thấy cải thiện đáng kể ở cả cách tiếp cận không giám sát (phân cụm truy vấn) [1, 8, 23] hoặc có giám sát (phân loại truy vấn). Trong các phương pháp có giám sát, các đặc trưng phổ biến gồm unigram, điểm mô hình ngôn ngữ, đặc trưng khớp từ điển (lexicon), v.v. [2, 3, 5].

### 7.2 Học sâu cho phân loại ý định truy vấn

Các phương pháp học sâu cho thấy cải thiện đáng kể trong các tác vụ phân loại văn bản, nơi nhiều phương pháp dựa trên CNN và LSTM [15, 17, 19, 21, 28] đã được đề xuất. Công trình liên quan gần nhất là một cách tiếp cận dựa trên CNN [10] để phân loại các loại truy vấn tìm kiếm web, với kiến trúc mạng tương tự như trong [17]. Đáng lưu ý là dù công nghệ mới nhất [9] đã cho thấy cải thiện đầy hứa hẹn cho việc hiểu văn bản, bao gồm phân loại ý định [6], hiệu năng trên văn bản ngắn như các truy vấn tìm kiếm vẫn chưa rõ ràng.

Theo hiểu biết tốt nhất của chúng tôi, chúng tôi chưa thấy các mô hình BERT được áp dụng vào các hệ thống tìm kiếm thực tế cho dự đoán ý định truy vấn.

### 7.3 Ý định truy vấn chưa hoàn chỉnh

Đã có các mô hình mức ký tự cho các tác vụ NLP kinh điển như phân loại văn bản và mô hình hóa ngôn ngữ [14, 18, 27]. Tuy nhiên, chúng tôi chưa tìm thấy công trình trước đây nào về các mô hình mức ký tự cho dự đoán ý định truy vấn chưa hoàn chỉnh trong các sản phẩm tìm kiếm production. Chúng tôi mở rộng thêm cách tiếp cận của mình thành một mô hình đa ngôn ngữ, trong đó một mô hình có thể phục vụ nhiều ngôn ngữ ở các thị trường quốc tế.

Một chủ đề liên quan đến typeahead search result blending là query auto completion [4]. Tuy nhiên, hai chủ đề này về cơ bản khác nhau về kiến trúc hệ thống. Cái trước có các hệ thống lập chỉ mục phức tạp để truy xuất tài liệu. Một hệ thống xếp hạng được xây dựng để trộn các tài liệu, trong đó ý định truy vấn là một đặc trưng. Mục tiêu của cái sau chỉ là sinh ra một truy vấn hoàn chỉnh mà không có bất kỳ thông tin nào từ phía tài liệu.

---

## 8. KẾT LUẬN

Bài báo này đề xuất một framework toàn diện để mô hình hóa ý định truy vấn trong các hệ thống tìm kiếm cho các thành phần sản phẩm khác nhau. Các mô hình dựa trên học sâu được đề xuất đã được chứng minh là hiệu quả và hiệu suất cho các ứng dụng tìm kiếm online. Chúng tôi cũng thảo luận các thách thức khi triển khai các mô hình này vào production cũng như những hiểu biết của mình trong việc đưa ra các quyết định đó. Chúng tôi hy vọng framework cũng như những kinh nghiệm trong hành trình của mình có thể hữu ích cho độc giả khi thiết kế các tác vụ hiểu truy vấn và phân loại văn bản trong thực tế.

---

## TÀI LIỆU THAM KHẢO (giữ nguyên bản gốc)

[1] Luca Maria Aiello, Debora Donato, Umut Ozertem, and Filippo Menczer. 2011. Behavior-driven clustering of queries into topics. In CIKM. 1373–1382.

[2] Jaime Arguello, Fernando Diaz, Jamie Callan, and Jean-Francois Crespo. 2009. Sources of evidence for vertical selection. In SIGIR. ACM, 315–322.

[3] Azin Ashkan, Charles LA Clarke, Eugene Agichtein, and Qi Guo. 2009. Classifying and characterizing query intent. In ECIR. Springer, 578–586.

[4] Fei Cai and Maarten De Rijke. 2016. A survey of query auto completion in information retrieval. Foundations and Trends® in Information Retrieval (2016).

[5] Huanhuan Cao, Derek Hao Hu, Dou Shen, Daxin Jiang, Jian-Tao Sun, Enhong Chen, and Qiang Yang. 2009. Context-aware query classification. In SIGIR. ACM, 3–10.

[6] Qian Chen, Zhu Zhuo, and Wen Wang. 2019. Bert for joint intent classification and slot filling. arXiv preprint arXiv:1902.10909 (2019).

[7] Heng-Tze Cheng, Levent Koc, Jeremiah Harmsen, Tal Shaked, Tushar Chandra, Hrishi Aradhye, Glen Anderson, Greg Corrado, Wei Chai, Mustafa Ispir, et al. 2016. Wide & deep learning for recommender systems. In DLRS. 7–10.

[8] Jackie Chi Kit Cheung and Xiao Li. 2012. Sequence clustering and labeling for unsupervised query intent discovery. In WSDM. 383–392.

[9] Jacob Devlin, Ming-Wei Chang, Kenton Lee, and Kristina Toutanova. 2018. Bert: Pre-training of deep bidirectional transformers for language understanding. arXiv preprint arXiv:1810.04805 (2018).

[10] Homa B Hashemi, Amir Asiaee, and Reiner Kraft. 2016. Query intent detection using convolutional neural networks. In WSDM.

[11] Sepp Hochreiter and Jürgen Schmidhuber. 1997. Long short-term memory. Neural computation 9, 8 (1997), 1735–1780.

[12] Jian Hu, Gang Wang, Fred Lochovsky, Jian-tao Sun, and Zheng Chen. 2009. Understanding user's query intent with wikipedia. In WWW. ACM, 471–480.

[13] Bernard J Jansen, Danielle L Booth, and Amanda Spink. 2008. Determining the informational, navigational, and transactional intent of Web queries. Information Processing & Management 44, 3 (2008), 1251–1266.

[14] Armand Joulin, Edouard Grave, Piotr Bojanowski, and Tomas Mikolov. 2016. Bag of tricks for efficient text classification. arXiv preprint arXiv:1607.01759 (2016).

[15] Nal Kalchbrenner, Edward Grefenstette, and Phil Blunsom. 2014. A Convolutional Neural Network for Modelling Sentences. In ACL. 655–665.

[16] In-Ho Kang and GilChang Kim. 2003. Query type classification for web document retrieval. In SIGIR. ACM, 64–71.

[17] Yoon Kim. 2014. Convolutional neural networks for sentence classification. arXiv preprint arXiv:1408.5882 (2014).

[18] Yoon Kim, Yacine Jernite, David Sontag, and Alexander M Rush. 2016. Character-aware neural language models. In AAAI.

[19] Ji Young Lee and Franck Dernoncourt. 2016. Sequential Short-Text Classification with Recurrent and Convolutional Neural Networks. In Proceedings of the 2016 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies. ACL, San Diego, California, 515–520. https://doi.org/10.18653/v1/N16-1062

[20] Xiao Li, Ye-Yi Wang, and Alex Acero. 2008. Learning query intent from regularized click graphs. In SIGIR. ACM, 339–346.

[21] Pengfei Liu, Xipeng Qiu, and Xuanjing Huang. 2016. Recurrent neural network for text classification with multi-task learning. In IJCAI.

[22] Jeffrey Pennington, Richard Socher, and Christopher D. Manning. 2014. GloVe: Global Vectors for Word Representation. In EMNLP. 1532–1543. http://www.aclweb.org/anthology/D14-1162

[23] Xiang Ren, Yujing Wang, Xiao Yu, Jun Yan, Zheng Chen, and Jiawei Han. 2014. Heterogeneous graph-based intent learning with queries, web pages and wikipedia concepts. In WSDM. 23–32.

[24] Daniel E Rose and Danny Levinson. 2004. Understanding user goals in web search. In WWW. 13–19.

[25] Rodrygo LT Santos, Craig Macdonald, and Iadh Ounis. 2011. Intent-aware search result diversification. In SIGIR. ACM, 595–604.

[26] Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N Gomez, Łukasz Kaiser, and Illia Polosukhin. 2017. Attention is all you need. In NIPS. 5998–6008.

[27] Xiang Zhang, Junbo Zhao, and Yann LeCun. 2015. Character-level convolutional networks for text classification. In NIPS. 649–657.

[28] Chunting Zhou, Chonglin Sun, Zhiyuan Liu, and Francis Lau. 2015. A C-LSTM neural network for text classification. arXiv preprint arXiv:1511.08630 (2015).

[29] Peng Zhou, Zhenyu Qi, Suncong Zheng, Jiaming Xu, Hongyun Bao, and Bo Xu. 2016. Text classification improved by integrating bidirectional LSTM with two-dimensional max pooling. arXiv preprint arXiv:1611.06639 (2016).
