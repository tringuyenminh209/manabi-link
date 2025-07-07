'use client';

import { useState } from 'react';
import { MessageCircle, Heart, Star, Clock, Users, MapPin, Globe, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/Components/Button';
import { Card, CardHeader, CardBody } from '@/Components/Card';
import { Badge } from '@/Components/Badge';
import { MainHeader } from '@/Layouts/GuestLayout';

export default function TeacherProfilePage() {
    const [showAllCourses, setShowAllCourses] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const teacherData = {
        name: 'Nguyễn Văn Minh',
        avatar: '/api/placeholder/120/120',
        coverImage: '/api/placeholder/1200/400',
        title: 'Giảng viên Guitar chuyên nghiệp',
        location: 'TP. Hồ Chí Minh, Việt Nam',
        languages: ['Tiếng Việt', 'English', '日本語'],
        experience: '8 năm kinh nghiệm',
        students: 1247,
        rating: 4.9,
        totalReviews: 156,
        verified: true,
        bio: 'Tôi là một giảng viên guitar với hơn 8 năm kinh nghiệm giảng dạy. Tôi đã giúp hơn 1000 học viên từ người mới bắt đầu đến trình độ nâng cao. Chuyên môn của tôi bao gồm guitar acoustic, fingerpicking, và sáng tác nhạc.',
        specialties: ['Guitar Acoustic', 'Fingerpicking', 'Sáng tác nhạc', 'Nhạc Blues'],
        achievements: [
            'Chứng chỉ giảng dạy âm nhạc quốc tế',
            'Giải nhất cuộc thi guitar toàn quốc 2020',
            'Hơn 1000 học viên đã tốt nghiệp',
        ],
    };

    const courses = [
        {
            id: 1,
            title: 'Guitar Cơ Bản - Từ Zero Đến Hero',
            image: '/api/placeholder/300/200',
            price: '299,000đ',
            rating: 4.9,
            students: 234,
            duration: '8 tuần',
        },
        {
            id: 2,
            title: 'Kỹ Thuật Fingerpicking Nâng Cao',
            image: '/api/placeholder/300/200',
            price: '399,000đ',
            rating: 4.8,
            students: 156,
            duration: '6 tuần',
        },
        {
            id: 3,
            title: 'Sáng Tác Nhạc Với Guitar',
            image: '/api/placeholder/300/200',
            price: '499,000đ',
            rating: 4.7,
            students: 89,
            duration: '10 tuần',
        },
        {
            id: 4,
            title: 'Blues Guitar Mastery',
            image: '/api/placeholder/300/200',
            price: '449,000đ',
            rating: 4.9,
            students: 123,
            duration: '8 tuần',
        },
    ];

    const reviews = [
        {
            id: 1,
            name: 'Nguyễn Minh Anh',
            course: 'Guitar Cơ Bản - Từ Zero Đến Hero',
            rating: 5,
            comment:
                'Thầy dạy rất tận tâm và dễ hiểu. Từ một người không biết gì về guitar, giờ em đã có thể chơi được những bài hát yêu thích. Cảm ơn thầy rất nhiều!',
            date: '2 tuần trước',
        },
        {
            id: 2,
            name: 'Trần Văn Hùng',
            course: 'Kỹ Thuật Fingerpicking Nâng Cao',
            rating: 5,
            comment:
                'Khóa học chất lượng cao, thầy giải thích từng kỹ thuật rất chi tiết. Fingerpicking của tôi đã cải thiện đáng kể sau khóa học này.',
            date: '1 tháng trước',
        },
        {
            id: 3,
            name: 'Lê Thị Mai',
            course: 'Sáng Tác Nhạc Với Guitar',
            rating: 4,
            comment:
                'Khóa học mở ra góc nhìn mới về sáng tác. Thầy chia sẻ nhiều kinh nghiệm thực tế và hướng dẫn rất cụ thể.',
            date: '3 tuần trước',
        },
    ];

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-energetic-yellow fill-current' : 'text-light-border'}`}
            />
        ));
    };

    return (
        <div className="min-h-screen bg-off-white">
            <MainHeader />

            {/* Cover Image */}
            <div className="relative h-64 md:h-80">
                <img
                    src={teacherData.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="manabi-container -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Teacher Info */}
                    <div className="lg:col-span-1">
                        <Card className="text-center">
                            <CardBody className="p-6">
                                <div className="relative inline-block mb-4">
                                    <img
                                        src={teacherData.avatar}
                                        alt={teacherData.name}
                                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                                    />
                                    {teacherData.verified && (
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success-green rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </div>

                                <h1 className="manabi-heading-2 mb-2">{teacherData.name}</h1>
                                <p className="text-silver-gray mb-4">{teacherData.title}</p>

                                <div className="flex items-center justify-center space-x-4 mb-6 text-sm text-silver-gray">
                                    <div className="flex items-center space-x-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{teacherData.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{teacherData.experience}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center space-x-1 mb-4">
                                    {renderStars(teacherData.rating)}
                                    <span className="ml-2 text-sm font-medium text-charcoal-gray">
                                        {teacherData.rating} ({teacherData.totalReviews} đánh giá)
                                    </span>
                                </div>

                                <div className="flex items-center justify-center space-x-1 mb-6 text-sm text-silver-gray">
                                    <Users className="w-4 h-4" />
                                    <span>{teacherData.students} học viên</span>
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        variant="primary"
                                        className="w-full"
                                        leftIcon={<MessageCircle className="w-4 h-4" />}
                                    >
                                        Nhắn tin
                                    </Button>
                                    <Button
                                        variant={isFollowing ? "secondary" : "ghost"}
                                        className="w-full"
                                        leftIcon={<Heart className={`w-4 h-4 ${isFollowing ? 'fill-current' : ''}`} />}
                                        onClick={() => setIsFollowing(!isFollowing)}
                                    >
                                        {isFollowing ? 'Đã theo dõi' : 'Theo dõi'}
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Languages */}
                        <Card className="mt-6">
                            <CardHeader>
                                <h3 className="manabi-heading-3 flex items-center">
                                    <Globe className="w-5 h-5 mr-2" />
                                    Ngôn ngữ
                                </h3>
                            </CardHeader>
                            <CardBody>
                                <div className="flex flex-wrap gap-2">
                                    {teacherData.languages.map((lang) => (
                                        <Badge key={lang} variant="info">
                                            {lang}
                                        </Badge>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Achievements */}
                        <Card className="mt-6">
                            <CardHeader>
                                <h3 className="manabi-heading-3 flex items-center">
                                    <Award className="w-5 h-5 mr-2" />
                                    Thành tích
                                </h3>
                            </CardHeader>
                            <CardBody>
                                <ul className="space-y-3">
                                    {teacherData.achievements.map((achievement, index) => (
                                        <li key={index} className="flex items-start space-x-2">
                                            <CheckCircle className="w-4 h-4 text-success-green mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-charcoal-gray">{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Right Column - Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About */}
                        <Card>
                            <CardHeader>
                                <h2 className="manabi-heading-2">Giới thiệu</h2>
                            </CardHeader>
                            <CardBody>
                                <p className="manabi-text-body mb-6">{teacherData.bio}</p>

                                <div>
                                    <h4 className="font-semibold text-charcoal-gray mb-3">Chuyên môn:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {teacherData.specialties.map((specialty) => (
                                            <Badge key={specialty} variant="secondary">
                                                {specialty}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Courses */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <h2 className="manabi-heading-2">Khóa học</h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowAllCourses(!showAllCourses)}
                                    >
                                        {showAllCourses ? 'Thu gọn' : 'Xem tất cả'}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(showAllCourses ? courses : courses.slice(0, 2)).map((course) => (
                                        <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <CardBody className="p-4">
                                                <h3 className="font-semibold text-charcoal-gray mb-2 line-clamp-2">
                                                    {course.title}
                                                </h3>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center space-x-1">
                                                        {renderStars(course.rating)}
                                                        <span className="text-sm text-silver-gray ml-1">
                                                            ({course.students})
                                                        </span>
                                                    </div>
                                                    <span className="font-semibold text-wisdom-blue">
                                                        {course.price}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm text-silver-gray">
                                                    <span>{course.duration}</span>
                                                    <Button variant="primary" size="sm">
                                                        Xem chi tiết
                                                    </Button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Reviews */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <h2 className="manabi-heading-2">Đánh giá từ học viên</h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowAllReviews(!showAllReviews)}
                                    >
                                        {showAllReviews ? 'Thu gọn' : 'Xem tất cả'}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-6">
                                    {(showAllReviews ? reviews : reviews.slice(0, 2)).map((review) => (
                                        <div key={review.id} className="border-b border-light-border pb-6 last:border-b-0">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h4 className="font-semibold text-charcoal-gray">
                                                        {review.name}
                                                    </h4>
                                                    <p className="text-sm text-silver-gray">
                                                        Khóa học: {review.course}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                            <p className="text-charcoal-gray mb-2">{review.comment}</p>
                                            <p className="text-sm text-silver-gray">{review.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
