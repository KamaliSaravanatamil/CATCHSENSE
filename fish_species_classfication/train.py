from ultralytics import YOLO
model = YOLO('yolov8n.pt') 
results = model.train(data='data.yaml',epochs=50,imgsz=640,batch=16,name='fish_yolov8_tiny',pretrained=True)
model.export(format='onnx')  # optional: export for mobile/edge use
