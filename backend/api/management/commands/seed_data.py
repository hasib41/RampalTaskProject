"""
Seed data command - populate database with sample data.
Run: python manage.py seed_data
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from api.models import Tender, News, Career, ProjectStat


class Command(BaseCommand):
    help = 'Seed database with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')
        
        # Clear existing data
        Tender.objects.all().delete()
        News.objects.all().delete()
        Career.objects.all().delete()
        ProjectStat.objects.all().delete()
        
        # Create Project Stats
        stats = [
            {'label': 'CAPEX', 'value': 15000, 'suffix': ' Cr', 'icon': '💰', 'order': 1},
            {'label': 'Milestones', 'value': 100, 'suffix': '%', 'icon': '🎯', 'order': 2},
            {'label': 'Manpower', 'value': 5000, 'suffix': '+', 'icon': '👥', 'order': 3},
            {'label': 'MW Generated', 'value': 1320, 'suffix': '', 'icon': '⚡', 'order': 4},
        ]
        for stat in stats:
            ProjectStat.objects.create(**stat)
        self.stdout.write(self.style.SUCCESS(f'Created {len(stats)} project stats'))
        
        # Create Tenders
        tenders = [
            {
                'title': 'Supply of Coal for Power Generation Unit 1 & 2',
                'description': 'Procurement of high-grade thermal coal for continuous power generation operations. Minimum calorific value of 5500 kcal/kg required.',
                'reference_number': 'BIFPCL/TENDER/2026/001',
                'deadline': timezone.now() + timedelta(days=30),
                'category': 'goods',
            },
            {
                'title': 'Annual Maintenance Contract for Turbine Systems',
                'description': 'Comprehensive maintenance services for 2x660 MW steam turbine generators including spare parts and technical support.',
                'reference_number': 'BIFPCL/TENDER/2026/002',
                'deadline': timezone.now() + timedelta(days=45),
                'category': 'services',
            },
            {
                'title': 'Construction of Ash Pond Extension',
                'description': 'Civil works for expansion of existing ash pond facility including earthwork, lining, and drainage systems.',
                'reference_number': 'BIFPCL/TENDER/2026/003',
                'deadline': timezone.now() + timedelta(days=60),
                'category': 'works',
            },
            {
                'title': 'Environmental Impact Assessment Study',
                'description': 'Consultancy services for comprehensive EIA study and environmental monitoring program for next 5 years.',
                'reference_number': 'BIFPCL/TENDER/2026/004',
                'deadline': timezone.now() + timedelta(days=20),
                'category': 'consultancy',
            },
            {
                'title': 'Procurement of Safety Equipment',
                'description': 'Supply of personal protective equipment, fire safety systems, and emergency response gear for plant personnel.',
                'reference_number': 'BIFPCL/TENDER/2026/005',
                'deadline': timezone.now() + timedelta(days=15),
                'category': 'goods',
            },
        ]
        for tender in tenders:
            Tender.objects.create(**tender)
        self.stdout.write(self.style.SUCCESS(f'Created {len(tenders)} tenders'))
        
        # Create News
        news_articles = [
            {
                'title': 'BIFPCL Achieves 100% Commercial Operation',
                'content': 'Bangladesh India Friendship Power Company Limited has achieved a major milestone with both units now operating at full commercial capacity. This marks a significant achievement in Bangladesh-India bilateral cooperation.',
                'summary': 'Both 660 MW units are now fully operational, marking a historic milestone for the joint venture.',
                'is_featured': True,
                'image_url': '/images/hero-1.png',
            },
            {
                'title': 'Prime Minister Visits Rampal Power Plant',
                'content': 'The Honorable Prime Minister visited the Rampal Power Plant and expressed satisfaction with the progress of the project. The PM praised the engineering excellence and environmental safeguards implemented.',
                'summary': 'PM lauds progress and environmental measures at the power plant.',
                'is_featured': True,
                'image_url': '/images/hero-3.png',
            },
            {
                'title': 'New Environmental Monitoring System Installed',
                'content': 'BIFPCL has installed state-of-the-art continuous emission monitoring systems (CEMS) to ensure compliance with environmental standards. The system provides real-time data on emissions.',
                'summary': 'Advanced CEMS ensures environmental compliance and transparency.',
                'is_featured': False,
            },
            {
                'title': 'Community Development Program Launched',
                'content': 'BIFPCL launched comprehensive community development initiatives including education scholarships, healthcare camps, and skill development programs for local residents.',
                'summary': 'Supporting local communities through education and healthcare initiatives.',
                'is_featured': False,
            },
            {
                'title': 'Safety Excellence Award Received',
                'content': 'BIFPCL received the National Safety Excellence Award for maintaining zero lost-time incidents for 12 consecutive months. The award recognizes our commitment to workplace safety.',
                'summary': 'Recognition for outstanding safety record and workplace standards.',
                'is_featured': False,
            },
        ]
        for article in news_articles:
            News.objects.create(**article)
        self.stdout.write(self.style.SUCCESS(f'Created {len(news_articles)} news articles'))
        
        # Create Careers
        careers = [
            {
                'title': 'Senior Power Plant Engineer',
                'department': 'Operations',
                'location': 'Rampal, Bagerhat',
                'description': 'Lead the operations team for 660 MW supercritical thermal power unit. Responsible for plant efficiency, safety protocols, and team management.',
                'requirements': 'B.Sc in Mechanical/Electrical Engineering, 10+ years experience in thermal power plants, knowledge of supercritical technology.',
                'job_type': 'full_time',
                'deadline': timezone.now().date() + timedelta(days=30),
                'vacancies': 2,
            },
            {
                'title': 'Environmental Officer',
                'department': 'Environment & Safety',
                'location': 'Rampal, Bagerhat',
                'description': 'Monitor and ensure compliance with environmental regulations. Prepare reports, coordinate with regulatory bodies, and implement green initiatives.',
                'requirements': 'M.Sc in Environmental Science, 5+ years experience in industrial environmental management, knowledge of EIA process.',
                'job_type': 'full_time',
                'deadline': timezone.now().date() + timedelta(days=25),
                'vacancies': 1,
            },
            {
                'title': 'Electrical Maintenance Technician',
                'department': 'Maintenance',
                'location': 'Rampal, Bagerhat',
                'description': 'Perform preventive and corrective maintenance on electrical systems including transformers, switchgear, and control systems.',
                'requirements': 'Diploma in Electrical Engineering, 3+ years experience in power plant maintenance, valid electrical work permit.',
                'job_type': 'full_time',
                'deadline': timezone.now().date() + timedelta(days=20),
                'vacancies': 5,
            },
            {
                'title': 'HR Intern',
                'department': 'Human Resources',
                'location': 'Rampal, Bagerhat',
                'description': 'Support HR team in recruitment, training coordination, and employee engagement activities. Great learning opportunity for fresh graduates.',
                'requirements': 'BBA/MBA in HRM, excellent communication skills, proficiency in MS Office.',
                'job_type': 'internship',
                'deadline': timezone.now().date() + timedelta(days=15),
                'vacancies': 2,
            },
            {
                'title': 'Security Supervisor',
                'department': 'Security',
                'location': 'Rampal, Bagerhat',
                'description': 'Supervise security operations, manage security personnel, coordinate with local authorities, and ensure asset protection.',
                'requirements': 'Ex-serviceman preferred, 5+ years experience in industrial security, valid security license.',
                'job_type': 'contract',
                'deadline': timezone.now().date() + timedelta(days=10),
                'vacancies': 3,
            },
        ]
        for career in careers:
            Career.objects.create(**career)
        self.stdout.write(self.style.SUCCESS(f'Created {len(careers)} career postings'))
        
        self.stdout.write(self.style.SUCCESS('✅ Database seeded successfully!'))
