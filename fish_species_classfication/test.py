from ultralytics import YOLO
import cv2
model = YOLO('runs/detect/fish_yolov8_tiny/weights/best.pt')
results = model.predict(source='test_fish.jpg', show=True, conf=0.5)

